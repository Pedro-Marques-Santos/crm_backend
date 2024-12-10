interface ISendRecruiterMessage {
  emailRecruiter: string;
  companyName: string;
  jobTitle: string;
  message: string;
  subject: string;
  nameStage?: string;
  currentStage?: string;
  totalStage?: string;
}

interface IRecruiterSendMessageSteps {
  allTo: string[];
  subject: string;
  emailRecruiter: string;
  message: string;
  jobTitle: string;
  companyName: string;
  nameStage?: string;
  currentStage?: string;
  totalStage?: string;
}

export { ISendRecruiterMessage, IRecruiterSendMessageSteps };
