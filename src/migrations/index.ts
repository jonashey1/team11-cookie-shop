import * as migration_20260928_082604_initial from './20260928_082604_initial';
import * as migration_20260928_151841_content_model from './20260928_151841_content_model';
import * as migration_20261004_165222_site_facts from './20261004_165222_site_facts';
import * as migration_20261004_173034_latest_end from './20261004_173034_latest_end';
import * as migration_20261004_205526_booking_request_id from './20261004_205526_booking_request_id';
import * as migration_20261004_222941_members_area from './20261004_222941_members_area';
import * as migration_20261123_092425 from './20261123_092425';
import * as migration_20261123_092825 from './20261123_092825';
import * as migration_20261124_202843_cookie_catalog from './20261124_202843_cookie_catalog';

export const migrations = [
  {
    up: migration_20260928_082604_initial.up,
    down: migration_20260928_082604_initial.down,
    name: '20260928_082604_initial',
  },
  {
    up: migration_20260928_151841_content_model.up,
    down: migration_20260928_151841_content_model.down,
    name: '20260928_151841_content_model',
  },
  {
    up: migration_20261004_165222_site_facts.up,
    down: migration_20261004_165222_site_facts.down,
    name: '20261004_165222_site_facts',
  },
  {
    up: migration_20261004_173034_latest_end.up,
    down: migration_20261004_173034_latest_end.down,
    name: '20261004_173034_latest_end',
  },
  {
    up: migration_20261004_205526_booking_request_id.up,
    down: migration_20261004_205526_booking_request_id.down,
    name: '20261004_205526_booking_request_id',
  },
  {
    up: migration_20261004_222941_members_area.up,
    down: migration_20261004_222941_members_area.down,
    name: '20261004_222941_members_area',
  },
  {
    up: migration_20261123_092425.up,
    down: migration_20261123_092425.down,
    name: '20261123_092425',
  },
  {
    up: migration_20261123_092825.up,
    down: migration_20261123_092825.down,
    name: '20261123_092825',
  },
  {
    up: migration_20261124_202843_cookie_catalog.up,
    down: migration_20261124_202843_cookie_catalog.down,
    name: '20261124_202843_cookie_catalog'
  },
];
