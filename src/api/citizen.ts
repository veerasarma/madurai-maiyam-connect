import { apiRequest } from "./client";
import type {
  AuthPayload,
  ComplaintCreateResult,
  ComplaintSchema,
  MyComplaintsResult,
  TrackComplaintResult,
  VolunteerApplyResult,
  VolunteerTaskItem,
  WardOption,
} from "./types";

export const citizenApi = {
  sendOtp: (phone: string) =>
    apiRequest<{ message: string; devOtp?: string }>("/auth/otp/send", {
      method: "POST",
      body: { phone },
      auth: false,
    }),

  verifyOtp: (phone: string, otp: string) =>
    apiRequest<AuthPayload>("/auth/otp/verify", {
      method: "POST",
      body: { phone, otp },
      auth: false,
    }),

  /** Phone-number access — same as mobile */
  phoneAccess: (phone: string, name?: string) =>
    apiRequest<AuthPayload>("/auth/phone-access", {
      method: "POST",
      body: { phone, ...(name ? { name } : {}) },
      auth: false,
    }),

  getComplaintSchema: () =>
    apiRequest<ComplaintSchema>("/forms/complaint-schema", { auth: false }),

  getWardOptions: async (): Promise<WardOption[]> => {
    try {
      return await apiRequest<WardOption[]>("/ward-details/complaint-options", {
        auth: false,
      });
    } catch {
      const rows = await apiRequest<Array<Record<string, unknown>>>("/ward-details", {
        auth: false,
      });
      return rows
        .filter((row) => row.secretaryRole === "ward_secretary" && row.wardNumber && row.geographyId)
        .map((row) => {
          const geographyId =
            typeof row.geographyId === "object" && row.geographyId !== null
              ? String((row.geographyId as { _id: string })._id)
              : String(row.geographyId);
          const areaName = String(row.areaName || "");
          const areaNameTa = String(row.areaNameTa || "");
          const wardNumber = String(row.wardNumber);
          return {
            id: geographyId,
            geographyId,
            wardNumber,
            name: `${areaName} - Ward ${wardNumber}`,
            nameTa: `${areaNameTa} - வார்டு ${wardNumber}`,
          };
        });
    }
  },

  presignMedia: (fileName: string, mimeType: string, size: number) =>
    apiRequest<{
      mediaId: string;
      uploadUrl: string | null;
      mockMode?: boolean;
    }>("/media/presign", {
      method: "POST",
      body: { fileName, mimeType, size },
    }),

  confirmMedia: (mediaId: string) =>
    apiRequest<unknown>("/media/confirm", {
      method: "POST",
      body: { mediaId },
    }),

  submitComplaint: (body: Record<string, unknown>) =>
    apiRequest<ComplaintCreateResult>("/complaints", {
      method: "POST",
      body,
      auth: false,
    }),

  trackComplaint: (ticketNumber: string, phone: string) =>
    apiRequest<TrackComplaintResult>(
      `/complaints/track/${encodeURIComponent(ticketNumber.trim().toUpperCase())}?phone=${encodeURIComponent(phone.replace(/\D/g, ""))}`,
      { auth: false },
    ),

  getMyComplaints: (page = 1, limit = 20) =>
    apiRequest<MyComplaintsResult>(`/complaints/my?page=${page}&limit=${limit}`),

  getComplaintDetail: (id: string) =>
    apiRequest<TrackComplaintResult>(`/complaints/${id}`),

  applyVolunteer: (body: { skills?: string[]; preferredWards?: string[] } = {}) =>
    apiRequest<VolunteerApplyResult>("/volunteers/apply", {
      method: "POST",
      body,
    }),

  getVolunteerTasks: () => apiRequest<VolunteerTaskItem[]>("/volunteers/my-tasks"),
};

/** Upload file via presigned URL (or mock confirm when S3 is off). */
export async function uploadEvidenceFile(
  file: File,
  submitter?: { phone?: string; name?: string },
): Promise<string> {
  const presign = await apiRequest<{
    mediaId: string;
    uploadUrl: string | null;
    mockMode?: boolean;
  }>("/media/presign", {
    method: "POST",
    auth: false,
    body: {
      fileName: file.name,
      mimeType: file.type || "application/octet-stream",
      size: file.size,
      submitterPhone: submitter?.phone,
      submitterName: submitter?.name,
    },
  });

  if (presign.uploadUrl) {
    const put = await fetch(presign.uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type || "application/octet-stream" },
      body: file,
    });
    if (!put.ok) {
      throw new Error("File upload failed. Please try again.");
    }
  }

  await apiRequest("/media/confirm", {
    method: "POST",
    auth: false,
    body: {
      mediaId: String(presign.mediaId),
      submitterPhone: submitter?.phone,
      submitterName: submitter?.name,
    },
  });
  return String(presign.mediaId);
}
