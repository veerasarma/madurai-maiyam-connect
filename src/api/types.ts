export interface FieldOption {
  _id?: string;
  label: string;
  labelTa: string;
  value: string;
  sortOrder?: number;
}

export interface FormField {
  _id: string;
  key: string;
  label: string;
  labelTa: string;
  type: string;
  required: boolean;
  validation?: { min?: number; max?: number };
  options?: FieldOption[];
  sortOrder?: number;
}

export interface FormSection {
  _id: string;
  key: string;
  title: string;
  titleTa: string;
  fields: FormField[];
  sortOrder?: number;
}

export interface CategoryNode {
  _id: string;
  name: string;
  nameTa: string;
  subCategories: Array<{ _id: string; name: string; nameTa: string }>;
}

export interface ComplaintSchema {
  version: number;
  sections: FormSection[];
  categories: CategoryNode[];
}

export interface WardOption {
  id: string;
  geographyId: string;
  name: string;
  nameTa: string;
  wardNumber?: string;
}

export interface AuthUser {
  id: string;
  phone: string;
  role: string;
  profile: { name: string; nameTa?: string };
}

export interface AuthPayload {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface ComplaintCreateResult {
  _id: string;
  ticketNumber: string;
  status: string;
}

export interface TrackComplaintTimelineEntry {
  action: string;
  createdAt: string;
  note?: string;
  toStatus?: string;
}

export interface TrackComplaintResult {
  complaint: {
    _id?: string;
    ticketNumber: string;
    status: string;
    description?: string;
    incidentLocationText?: string;
    priority?: string;
    mapsLink?: string;
  };
  timeline: TrackComplaintTimelineEntry[];
}

export interface MyComplaintItem {
  _id: string;
  ticketNumber: string;
  status: string;
  description?: string;
  incidentLocationText?: string;
  priority?: string;
  createdAt?: string;
}

export interface MyComplaintsResult {
  items: MyComplaintItem[];
  total: number;
  page?: number;
  limit?: number;
}

export interface VolunteerTaskItem {
  _id: string;
  ticketNumber: string;
  status: string;
  description?: string;
  incidentLocationText?: string;
  priority?: string;
}

export interface VolunteerApplyResult {
  _id: string;
  userId: string;
  approvalStatus?: string;
  skills?: string[];
}
