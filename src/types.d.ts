declare interface MatcherProps {
  id: number;
  university: string;
  courseName: string;
  publishDate: string;
  dueDate: string;
  createdAt: string;
  published: boolean;
  pastDue: boolean;
  submissionsCount: number;
  matchingStrategy: string;
  groupSize: number;
  status: string;
  questions: Array<QuestionProps>;
  admins: Array<AdminProps>;
  students: Array<StudentProps>;
  notifications: Array<NotificationProps>;
}

declare interface NotificationProps {
  id: number;
  content: string;
  creatorName: string;
  createdAt: string;
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
  questions: Array<QuestionProps>;
  selectedAnswers: Array<AnswerProps>;
}

declare interface AdminProps {
  id: number;
  name: string;
  email: string;
  verified: boolean;
}