import { Module } from '@nestjs/common';
import { ACLGuard } from './ACL.guard';

@Module({
    controllers: [],
    providers: [ACLGuard],
})
export class GuardModule { };
