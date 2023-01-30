import { Controller, Get } from '@nestjs/common';
import { CommunityService } from './community.service';

@Controller('communities')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get()
  fetchCommunities() {
    return this.communityService.findAll();
  }
}
