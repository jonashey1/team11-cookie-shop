
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Topics } from './collections/Topics'
import { Workshops } from './collections/Workshops'
import { WorkshopSessions } from './collections/WorkshopSessions'
import { WorkshopRegistrations } from './collections/WorkshopRegistrations'
import { Clinics } from './collections/Clinics'
import { TimeSlots } from './collections/TimeSlots'
import { Bookings } from './collections/Bookings'
import { Repairs } from './collections/Repairs'
import { Cookies } from './collections/Cookies'
import { Orders } from './collections/Orders'
import { Throttle } from './collections/Throttle'
import { Members } from './collections/Members'
import { SiteFacts } from './globals/SiteFacts'
import { restrictLinkedDeletion } from './lib/modelSchema'
import { createFirstAdmin } from './lib/firstAdmin'
import { isEditor } from './access'
import { withVerifiedSsl } from '../scripts/lib/ssl.mjs'
import { databaseEnvironment } from '../scripts/lib/databaseEnv.mjs'
import { databaseTransactions } from '../scripts/lib/localDatabase.mjs'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseUrl = databaseEnvironment(process.env).pooledUrl
const transactions = databaseTransactions(databaseUrl)

const config = buildConfig({
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' | Cookie Shop Admin' },
    components: { afterNavLinks: ['./components/admin/OrderAnalyticsLink#OrderAnalyticsLink'] },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [
    Users,
    Media,
    Pages,
    Topics,
    Workshops,
    WorkshopSessions,
    WorkshopRegistrations,
    Clinics,
    TimeSlots,
    Bookings,
    Repairs,
    Cookies,
    Orders,
    Throttle,
    Members,
  ],

  globals: [SiteFacts],

  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      alwaysInsertFields: true,
      clientUploads: { access: isEditor },
    }),
  ],

  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',

  onInit: createFirstAdmin,

  custom: { databaseTransactions: transactions },

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    beforeSchemaInit: [restrictLinkedDeletion],
    pool: {
      connectionString: withVerifiedSsl(databaseUrl),
    },
    ...(transactions ? {} : { transactionOptions: false as const }),
    push: false,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),

  graphQL: {
    disable: true,
  },

  sharp,
})

export default config.then((built) => {
  const locks = built.collections.find(
    (collection) => collection.slug === 'payload-locked-documents',
  )

  if (locks) {
    locks.access = {
      ...locks.access,
      create: isEditor,
      read: isEditor,
      update: isEditor,
      delete: isEditor,
    }
  }

  return built
})
