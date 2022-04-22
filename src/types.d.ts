declare interface MatcherProps {
  id: number;
  courseName: string;
  publishDate: string;
  dueDate: string;
  active: boolean
  submissionsCount: number;
}

declare interface SubmissionProps {
  name: string;
  email: string;
  courseName: string;
  submissionTimestamp: string;
}

declare interface AdminData {
  id: number;
  name: string;
  email: string;
  verified: boolean;
}