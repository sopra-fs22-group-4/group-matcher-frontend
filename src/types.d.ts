declare interface MatcherProps {
  id: number;
  university: string;
  courseName: string;
  publishDate: string;
  dueDate: string;
  createdAt: string;
  active: boolean;
  published: boolean;
  pastDue: boolean;
  submissionsCount: number;
  matchingStrategy: string;
  groupSize: number;
  questions: Array<QuestionProps>;
  admins: Array<AdminProps>;
  students: Array<StudentProps>;
}

declare interface QuestionProps {
  id: number;
  ordinalNum: number;
  content: string;
  weight: number;
  questionType: string;
  questionCategory: string;
  answers: Array<AnswerProps>;
}

declare interface AnswerProps {
  id: number;
  ordinalNum: number;
  content: string;
}

declare interface SubmissionProps {
  name: string;
  email: string;
  courseName: string;
  submissionTimestamp: string;
}

declare interface StudentProps extends SubmissionProps {
  id: number;
}

declare interface AdminProps {
  id: number;
  name: string;
  email: string;
  verified: boolean;
}