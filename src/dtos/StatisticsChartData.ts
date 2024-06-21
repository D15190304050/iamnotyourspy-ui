interface AverageWaitingDaysByApplicationType
{
    applicationType: number,
    averageWaitingDays: number,
}

interface WaitingDaysResponse
{
    averageWaitingDaysOfApplicationTypes: AverageWaitingDaysByApplicationType[],
    averageWaitingDays: number,
}

export type {AverageWaitingDaysByApplicationType, WaitingDaysResponse};