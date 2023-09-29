export enum IncidentStatus {
  UNASSIGNED = 'Unassigned',
  ASSIGNED = 'Assigned',
  IN_PROGRESS = 'In progress',
  CANCEL = 'Cancel',
}

export const IncidentStatusArray = Object.values(IncidentStatus);
