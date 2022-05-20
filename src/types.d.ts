declare interface MatcherProps {
  id: number;
  university: string;
  courseName: string;
  publishDate: Date;
  dueDate: Date;
  createdAt: string;
  published: boolean;
  pastDue: boolean;
  submissionsCount: number;
  matchingStrategy: string;
  groupSize: number;
  status: string;
  questions: Array<QuestionProps>;
  collaborators: Array<AdminProps>;
  students: Array<StudentProps>;
  notifications: Array<NotificationProps>;
}

declare interface NotificationProps {
  id: number;
  content: string;
  creatorName: string;
  createdAt: string;
  courseName: string;
}

declare interface QuestionProps {
  id: number;
  content: string;
  questionType: string;
  questionCategory: string;
  answers: Array<AnswerProps>;
}

declare interface AnswerProps {
  id: number;
  content: string;
}

declare interface StudentProps {
  id: number;
  name: string;
  email: string;
  courseName: string;
  submissionTimestamp: string;
  questions: Array<QuestionProps>;
  selectedAnswers: Array<AnswerProps>;
}

declare interface AdminProps {
  id: number;
  name: string;
  email: string;
  verified: boolean;
  hasPassword: boolean;
}