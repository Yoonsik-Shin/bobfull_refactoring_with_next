import { Repository } from 'typeorm';
import { Community } from './entities/community.entity';
export declare class CommunityService {
    private readonly communityRepository;
    constructor(communityRepository: Repository<Community>);
    findAll(): Promise<string>;
}
