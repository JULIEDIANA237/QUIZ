// src/models/index.ts
import {User} from './user.model';
import Feedback from './feedback.model';

User.associate();
Feedback.associate();

export { User, Feedback };
