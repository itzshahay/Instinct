import * as Moment from 'moment';
import {rankWire} from '../rank';
import {gangWire} from '../gang';
import {UserEntity} from './user.entity';
import {User} from 'instinct-rp-interfaces';
import { businessJobWire } from '../business';

export function userWire(userEntity: UserEntity): User {
  return {
    id: userEntity.id!,
    username: userEntity.username,
    motto: userEntity.motto!,
    credits: userEntity.credits,
    pixels: userEntity.pixels,
    points: userEntity.points,
    online: userEntity.online === 1,
    figure: userEntity.figure,
    joinDate: Moment.unix(userEntity.accountCreated).toISOString(),
    lastLoginDate: Moment.unix(userEntity.lastOnline).toISOString(),
    rank: userEntity.rank !== undefined ? rankWire(userEntity.rank!) : undefined,
    gang: userEntity.gang ? gangWire(userEntity.gang) : undefined,
    job: userEntity.job ? businessJobWire(userEntity.job.job!) : undefined,
  };
}
