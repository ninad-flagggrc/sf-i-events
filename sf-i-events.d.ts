/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */
import { LitElement, PropertyValueMap } from 'lit';
/**
 * SfIEvents element.
 * @fires renderComplete - When the list is populated
 * @fires valueChanged - When the value is changed
 * @property apiId - backend api id
 * @property label - input label
 * @property name - name of the input
 * @property mode - mode of operation
 * @property selectedId - id to preselect
 * @property selectedValue - callback function
 */
export declare class SfIEvents extends LitElement {
    SEARCH_BLOCK_SIZE: number;
    FLOW_GRAPH_COMPLETENESS: string;
    FLOW_GRAPH_TIMELINESS: string;
    FLOW_GRAPH_COMPLIANCE: string;
    FLOW_GRAPH_RISKAREAS: string;
    FLOW_GRAPH_RISKSEVERITY: string;
    FLOW_GRAPH_LOCATION: string;
    FLOW_GRAPH_FUNCTION: string;
    FLOW_GRAPH_OBLIGATIONTYPE: string;
    FLOW_GRAPH_JURISDICTION: string;
    FLOW_GRAPH_FREQUENCY: string;
    FLOW_GRAPH_SUBCATEGORY: string;
    TAB_GROUP_BUSINESS_UNDERSTANDING: string;
    TAB_GROUP_GOVERNANCE_MAPPING: string;
    TAB_GROUP_CUSTOMIZATION: string;
    TAB_GROUP_ROLLOUT: string;
    TAB_YEAR: string;
    TAB_FIND: string;
    TAB_STREAM: string;
    TAB_UPCOMING: string;
    TAB_THIS: string;
    TAB_PAST: string;
    TAB_CUSTOM: string;
    TAB_ADHOC: string;
    TAB_REPORTER: string;
    TAB_APPROVER: string;
    TAB_FUNCTION_HEAD: string;
    TAB_AUDITOR: string;
    TAB_VIEWER: string;
    TAB_STATUTES: string;
    TAB_COMPLIANCES: string;
    TAB_ENTITIES: string;
    TAB_LOCATIONS: string;
    TAB_TAGS: string;
    TAB_REPORTERS: string;
    TAB_APPROVERS: string;
    TAB_FUNCTION_HEADS: string;
    TAB_MAKER_CHECKERS: string;
    TAB_AUDITORS: string;
    TAB_DOCS: string;
    TAB_VIEWERS: string;
    TAB_DUEDATES: string;
    TAB_EXTENSIONS: string;
    TAB_TRIGGERS: string;
    TAB_ALERTSCHEDULES: string;
    TAB_INTERNALCONTROLS: string;
    TAB_SIGNOFF: string;
    TAB_FUNCTIONS: string;
    TAB_COUNTRIES: string;
    TAB_CALENDAR: string;
    TAB_RCM_COMPLIANCES: string;
    TAB_RCM_PROJECTS: string;
    TAB_RCM_DATE: string;
    TAB_RCM_CONFIRM: string;
    TAB_RCM_JOBS: string;
    COLOR_APPROVED: string;
    COLOR_NOT_STARTED: string;
    COLOR_PENDING_APPROVAL: string;
    COLOR_REJECTED: string;
    COLOR_PAST_DUE_DATE: string;
    COLOR_LATE_EXECUTED: string;
    COLOR_LATE_APPROVED: string;
    COLOR_LATE_REPORTED: string;
    COLOR_SCHEDULED: string;
    COLOR_NOT_COMPLIED: string;
    COLOR_PARTIALLY_COMPLIED: string;
    COLOR_COMPLIED: string;
    CERTIFICATE_HTML: string;
    COMPLIANCES_HTML: string;
    MAPPING_HTML: string;
    TAGGING_HTML: string;
    AUTOSAVE_FLAG: boolean;
    chartSelectedLegend: Array<number>;
    selectedFilter: any;
    barCharDataSet2: Array<any>;
    barCharDataSet2Arr: Array<any>;
    barCharDataSet3: Array<any>;
    barCharDataSet3Arr: Array<any>;
    barCharDataSet4: Array<any>;
    barCharDataSet4Arr: Array<any>;
    filteronboarding: string;
    getfilterOnboarding: () => any;
    getFilterOnboardingString: () => string;
    locations: string;
    getLocations: () => any;
    getLocationsByCountry: (country: string, statute: string) => any[];
    getLocationsByState: (country: string, state: string, statute: string) => any[];
    selectedCbs: Array<any>;
    projectId: string;
    name: string;
    disableflagggrcresponse: string;
    disablesave: string;
    disableclientresponse: string;
    disablesignoff: string;
    apiId: string;
    apiIdStatutes: string;
    apiIdProjects: string;
    apiIdCompliances: string;
    apiIdList: string;
    apiIdDetail: string;
    apiIdUsers: string;
    apiIdTags: string;
    apiMethodList: string;
    apiMethodDetail: string;
    apiBodyList: string;
    apiBodyDetail: string;
    userProfileId: string;
    graphParam: string;
    entityId: string;
    locationId: string;
    countryId: string;
    functionId: string;
    tagId: string;
    userName: string;
    projectName: string;
    apiResponseFieldList: string;
    rcmSelectedCompliance: any;
    rcmSelectedProjects: any;
    rcmSelectedDate: any;
    rcmSelectedMessage: any;
    myOnboardingTab: string;
    myOnboardingTabGroup: string;
    myRcmTab: string;
    myRole: string;
    chart: any;
    chart2: any;
    chart3: any;
    chart4: any;
    calendarStartDD: string;
    calendarStartMM: string;
    calendarStartYYYY: string;
    calendar: Date[];
    mappedValuesDueDates: any;
    mappedValuesUsers: any;
    mappedValuesTags: any;
    unmappedEvents: any;
    mappings: any;
    triggers: any;
    monthNames: string[];
    events: any;
    streamIndex: any;
    eventsInWindow: any;
    eventHideFields: any;
    getEventHideFields: () => any;
    eventPreviewFields: any;
    getEventPreviewFields: () => any;
    eventFields: any;
    getEventFields: () => any;
    eventFieldDependencies: any;
    getEventFieldDependencies: () => any;
    getApiBodyList: () => any;
    getApiBodyDetail: () => any;
    csvDataCompliances: string;
    csvDataStats: string;
    csvGraphStats: string;
    csvCompletenessStats: string;
    csvTimelinessStats: string;
    csvComplianceStats: string;
    htmlDataCompliances: string;
    htmlDataStats: string;
    period: string;
    mode: string;
    flowRcmNotification: number;
    flowGraph: string;
    flow: string;
    fill: string;
    filterTags: string[];
    subfilter: string;
    riskAreasData: any;
    riskAreasPartStatusData: any;
    riskAreasLateStatusData: any;
    riskAreasComplianceStatusData: any;
    riskSeverityData: any;
    arrCols: Array<string>;
    arrRcmProjectCols: Array<string>;
    riskSeverityPartStatusData: any;
    riskSeverityLateStatusData: any;
    riskSeverityComplianceStatusData: any;
    functionData: any;
    functionPartStatusData: any;
    functionLateStatusData: any;
    functionComplianceStatusData: any;
    obligationTypeData: any;
    obligationTypePartStatusData: any;
    obligationTypeLateStatusData: any;
    obligationTypeComplianceStatusData: any;
    jurisdictionData: any;
    jurisdictionPartStatusData: any;
    jurisdictionLateStatusData: any;
    jurisdictionComplianceStatusData: any;
    currentColumnIndex: string;
    frequencyData: any;
    frequencyPartStatusData: any;
    frequencyLateStatusData: any;
    frequencyComplianceStatusData: any;
    subcategoryData: any;
    subcategoryPartStatusData: any;
    subcategoryLateStatusData: any;
    subcategoryComplianceStatusData: any;
    locationData: any;
    locationPartStatusData: any;
    locationLateStatusData: any;
    locationComplianceStatusData: any;
    selectedItems: Array<string>;
    selectedStatus: string;
    selectedTab: string;
    restrictToMapping: string;
    enableDeleteLatestReport: string;
    stream: string;
    static styles: import("lit").CSSResult;
    _SfIEventsC: any;
    _SfRowError: any;
    _SfRowErrorMessage: any;
    _SfRowSuccess: any;
    _SfRowSuccessMessage: any;
    _SfLoader: any;
    _SfCalendarContainer: any;
    _SfButtonGenerate: any;
    _SfButtonSearch: any;
    _SfButtonSave: any;
    _SfButtonNext: any;
    _SfButtonPrev: any;
    _SfInputSearch: any;
    _SfButtonSyncChosenProject: any;
    _SfButtonMapChosenProject: any;
    _SfButtonBackChosenProject: any;
    _SfButtonBackCalendarMapping: any;
    _SfButtonBackSyncMapping: any;
    _SfButtonBackChosenMapping: any;
    _SfTitleChosenProject: any;
    _SfTitleChosenMapping: any;
    _SfContainerChosenProject: any;
    _SfContainerProjectSelect: any;
    _SfContainerProjectActions: any;
    _SfStreamContainer: any;
    _SfUpcomingContainer: any;
    _SfDetailContainer: any;
    _SfThisContainer: any;
    _SfPastContainer: any;
    _SfCustomContainer: any;
    _SfAdhocContainer: any;
    _SfFindContainer: any;
    _SfMappingContainer: any;
    _SfStreamEventStatus: any;
    _SfTabContainer: any;
    _SfMappingTabContainer: any;
    _SfRoleTabContainer: any;
    _SfOnboardingTabContainer: any;
    _SfOnboardingStatusContainer: any;
    _SfRcmContainer: any;
    _SfRcmContainerList: any;
    _SfRcmTabContainer: any;
    _SfOnboardingStatutesListContainer: any;
    _SfRcmComplianceContainer: any;
    _SfRcmProjectsContainer: any;
    _SfRcmDateContainer: any;
    _SfRcmConfirmContainer: any;
    _SfRcmJobsContainer: any;
    _SfOnboardingStatutesContainer: any;
    _SfOnboardingCompliancesListContainer: any;
    _SfOnboardingCompliancesContainer: any;
    _SfOnboardingEntitiesListContainer: any;
    _SfOnboardingEntitiesContainer: any;
    _SfOnboardingFunctionsContainer: any;
    _SfOnboardingFunctionsListContainer: any;
    _SfOnboardingCountriesContainer: any;
    _SfOnboardingCountriesListContainer: any;
    _SfOnboardingLocationsListContainer: any;
    _SfOnboardingLocationsContainer: any;
    _SfOnboardingTagsListContainer: any;
    _SfOnboardingTagsContainer: any;
    _SfOnboardingReportersListContainer: any;
    _SfOnboardingReportersContainer: any;
    _SfOnboardingApproversContainer: any;
    _SfOnboardingFunctionHeadsContainer: any;
    _SfOnboardingMakerCheckersContainer: any;
    _SfOnboardingDocsContainer: any;
    _SfOnboardingAuditorsContainer: any;
    _SfOnboardingExtensionsContainer: any;
    _SfOnboardingViewersContainer: any;
    _SfOnboardingApproversListContainer: any;
    _SfOnboardingMakerCheckersListContainer: any;
    _SfOnboardingDocsListContainer: any;
    _SfOnboardingFunctionHeadsListContainer: any;
    _SfOnboardingAuditorsListContainer: any;
    _SfOnboardingViewersListContainer: any;
    _SfOnboardingDuedatesListContainer: any;
    _SfOnboardingExtensionsListContainer: any;
    _SfOnboardingDuedatesContainer: any;
    _SfOnboardingAlertSchedulesListContainer: any;
    _SfOnboardingAlertSchedulesContainer: any;
    _SfOnboardingTriggersContainer: any;
    _SfOnboardingTriggersListContainer: any;
    _SfOnboardingInternalControlsListContainer: any;
    _SfOnboardingInternalControlsContainer: any;
    _SfOnboardingSignoffContainer: any;
    _SfOnboardingCalendarListContainer: any;
    _SfOnboardingCalendarContainer: any;
    _SfOnboardingTabGroup0: any;
    _SfOnboardingTabGroup1: any;
    _SfOnboardingTabGroup2: any;
    _SfOnboardingTabGroup3: any;
    _SfOnboardingTabGroupButton0: any;
    _SfOnboardingTabGroupButton1: any;
    _SfOnboardingTabGroupButton2: any;
    _SfOnboardingTabGroupButton3: any;
    _SfProject: any;
    _SfUploader: any;
    isSelectedLegend: (value: number) => any;
    removeFromSelectedLegend: (value: number) => void;
    clearSelectedLegend: () => void;
    clearSelectedGraphParam: () => void;
    getEventField: (field: string) => any;
    getParentFieldFromDepedencies: (field: string) => any;
    getEventTexts: (field: string, selectedId: Array<string>, row: any) => string;
    clearTabs: () => void;
    enableCalendar: () => void;
    enableStream: () => void;
    enableUpcoming(): void;
    enableThis(): void;
    enablePast(): void;
    enableCustom(): void;
    enableFind(): void;
    enableAdhoc(): void;
    prepareXhr: (data: any, url: string, loaderElement: any, authorization: any, loaderText?: string) => Promise<unknown>;
    clearMessages: () => void;
    setError: (msg: string) => void;
    setSuccess: (msg: string) => void;
    getLastDayOfLastMonth: (month: number, year: number) => number;
    getLastDayOfMonth: (month: number, year: number) => number;
    getFirstDateOfLastWeek: (startDate: Date) => Date;
    getFirstDayOfLastMonth(yourDate: Date): Date;
    getFirstDateOfWeek: (startDate: Date) => Date;
    getBlanks: (month: number, year: number) => number;
    getMonthStatus: (month: number, year: number) => {
        percNotStarted: number;
        percPendingApproval: number;
        percApproved: number;
        percRejected: number;
    };
    insertDates: (month: number, year: number) => string;
    insertDayNames: () => string;
    getYearFromMonthAndCalendarStart: (mm: string) => string;
    getPastDueDate: (mmdd: string) => boolean;
    getLateExecuted: (mmdd: string, event: any) => boolean;
    getLateReported: (mmdd: string, event: any) => boolean;
    getLateApproved: (mmdd: string, event: any) => boolean;
    updateGraphStats: (arr: Array<string>, arrData: any, arrPartData: any, arrLateData: any, arrComplianceData: any, partStatus: string, lateStatus: string, complianceStatus: string) => {
        arrData: any;
        arrPartData: any;
        arrLateData: any;
        arrComplianceData: any;
    };
    updateJurisdictionStats: (jurisdictions: Array<string>, partStatus: string, lateStatus: string, complianceStatus: string) => void;
    updateSubcategoryStats: (subcategories: Array<string>, partStatus: string, lateStatus: string, complianceStatus: string) => void;
    updateFrequencyStats: (frequencies: Array<string>, partStatus: string, lateStatus: string, complianceStatus: string) => void;
    updateLocationStats: (location: string, partStatus: string, lateStatus: string, complianceStatus: string) => void;
    updateFunctionStats: (functions: Array<string>, partStatus: string, lateStatus: string, complianceStatus: string) => void;
    updateRiskAreaStats: (riskAreas: Array<string>, partStatus: string, lateStatus: string, complianceStatus: string) => void;
    updateRiskSeverityStats: (riskSeverities: Array<string>, partStatus: string, lateStatus: string, complianceStatus: string) => void;
    updateObligationTypeStats: (obligationTypes: Array<string>, partStatus: string, lateStatus: string, complianceStatus: string) => void;
    getReporterStringFromEvent: (event: any) => string;
    getReporterDetailStringFromEvent: (event: any) => string;
    getApproverStringFromEvent: (event: any) => string;
    getApproverDetailStringFromEvent: (event: any) => string;
    renderLatestCompliance: (mmddyyyy: string, event: any) => any;
    getCompletenessStatus: (event: any) => "rejected" | "not-started" | "approved" | "pending-approval";
    getTimelinessStatus: (mmdd: string, event: any, completeness: string) => "late-executed" | "late-reported" | "late-approved" | "past-due-date" | "in-time";
    getComplianceStatus: (completeness: string, timeliness: string) => "scheduled" | "not-complied" | "partially-complied" | "complied";
    numcalled: number;
    updateStats: (event: any, partStatus: string, lateStatus: string, complianceStatus: string) => void;
    renderCalendarGraphs: (showGraph: boolean) => string;
    renderCalendarContainerDivStart: (index: number) => string;
    renderCalendarContainerDivEnd: () => string;
    renderCalendarEventSummary: () => string;
    getCalendarRowHide: (events: any, i: number, lastDay: number, month: number, firstDate?: any, currDate?: any) => boolean;
    renderCalendarRowDivStart: (i: number, firstDate?: any, ddmm?: string) => string;
    renderCalendarRowDivEnd: () => string;
    renderCalendarRowDivItemDivStart: (mmdd: string, event: any, j: number, partStatus: string) => string;
    renderCalendarRowDivItemDivEnd: () => string;
    renderCalendarBlankRowDiv: (hide: boolean, slice: number, i: number, firstDate?: any, ddmm?: string) => {
        html: string;
        slice: number;
    };
    renderCalendarRowDivItemDivTableHead: (event: any, partStatus: string) => string;
    renderCalendarRowDivItemDivTableBody: (event: any, partStatus: string, lateStatus: string, complianceStatus: string, mmdd: string, i: number, j: number) => string;
    renderStatusHtml: (partStatus: string, lateStatus: string, complianceStatus: string, i: number) => string;
    renderStatusString: (partStatus: string, lateStatus: string, complianceStatus: string) => string;
    getGraphParam: (event: any) => string;
    renderCalendarAnnotations: (event: any) => string;
    renderEvents: (firstDay: any, endDay: any, iInit: number, iLast: number, showGraph: boolean, index: number, month: number, period: string, firstDate?: any) => string;
    renderStreamEvents: (index: number, month: number, year: number, showGraph?: boolean) => string;
    renderThisEvents: (index: number, startDate: Date, showGraph?: boolean) => string;
    renderRangeEvents: (firstDate: Date, count: number, eventsContainer: HTMLDivElement) => void;
    checkStartDateEarliness: (value: string) => boolean;
    checkEndDateLateness: (value: string) => boolean;
    attachHandlers: (eventContainer: HTMLDivElement, valueStart: string, valueEnd: string) => void;
    processFindSelection: (eventContainer: HTMLDivElement, searchString: string) => Promise<void>;
    processDateSelection: (eventContainer: HTMLDivElement) => Promise<void>;
    initFindRightCol: () => void;
    initCustomRightCol: () => void;
    checkAndShowBulk: () => boolean;
    calculateAndShowSummary: () => void;
    showAllEvents: () => void;
    showMappedEvents: () => void;
    showUnmappedEvents: () => void;
    updateInAllSelections: (param: string, value: any) => void;
    updateMappingStatus: (value: any, clickIndex: number) => void;
    filterEventsInWindow: (tags: Array<string>, ctx: any, divContainer: HTMLDivElement | null) => void;
    sleep: (ms: number) => Promise<unknown>;
    hideTabContainers: () => Promise<void>;
    hideRcmTabContainers: () => Promise<void>;
    loadRcmNotifications: () => Promise<void>;
    loadRcmCompliances: () => Promise<void>;
    loadRcmProjects: () => Promise<void>;
    loadRcmDate: () => Promise<void>;
    loadRcmJobs: () => Promise<void>;
    loadOnboardingStatutes: () => Promise<void>;
    loadOnboardingCompliances: () => Promise<void>;
    loadOnboardingCountries: () => Promise<void>;
    loadOnboardingEntities: () => Promise<void>;
    loadOnboardingLocations: () => Promise<void>;
    loadOnboardingFunctions: () => Promise<void>;
    loadOnboardingTags: () => Promise<void>;
    loadProposedFromStatutes: (fieldIndex: number) => Promise<any>;
    loadOnboardingReporters: () => Promise<void>;
    loadOnboardingApprovers: () => Promise<void>;
    loadOnboardingFunctionHeads: () => Promise<void>;
    loadOnboardingViewers: () => Promise<void>;
    loadOnboardingDocs: () => Promise<void>;
    loadOnboardingMakerCheckers: () => Promise<void>;
    loadOnboardingAuditors: () => Promise<void>;
    loadOnboardingDuedates: () => Promise<void>;
    loadOnboardingAlertSchedules: () => Promise<void>;
    loadOnboardingExtensions: () => Promise<void>;
    loadOnboardingTriggers: () => Promise<void>;
    loadOnboardingInternalControls: () => Promise<void>;
    loadOnboardingSignoff: () => Promise<void>;
    loadOnboardingCalendar: () => Promise<void>;
    calculateStartAndEndDateOfPast: (index?: number) => {
        startDate: string;
        endDate: string;
    };
    calculateStartAndEndDateOfThis: (index?: number) => {
        startDate: string;
        endDate: string;
    };
    calculateStartAndEndDateOfUpcoming: (index?: number) => any;
    calculateStartAndEndDateOfStream: (index?: number) => {
        startDate: string;
        endDate: string;
    } | null;
    renderAdhoc: (events?: Array<any> | null, triggers?: Array<any> | null) => void;
    renderFind: () => void;
    renderCustom: () => void;
    renderThis: (index?: number, showGraph?: boolean) => void;
    renderStream: (index?: number, showGraph?: boolean) => void;
    attachTimelineFilterHandlers: (divContainer: HTMLDivElement) => void;
    getCurrentYear: (mm: string) => string;
    clearButtonSelection: () => void;
    clearGraphData: () => void;
    showGraph: (divContainer: HTMLDivElement, index: number) => void;
    clearGraph: (divContainer: HTMLDivElement, index: number) => void;
    renderCompletenessCsvForGraph: (dataBar: any, parameter: string) => void;
    renderTimelinessCsvForGraph: (dataBar: any, parameter: string) => void;
    renderComplianceCsvForGraph: (dataBar: any, parameter: string) => void;
    renderCompletenessGraph: (divContainer: HTMLDivElement) => void;
    renderComplianceGraph: (divContainer: HTMLDivElement) => void;
    renderTimelinessGraph: (divContainer: HTMLDivElement) => void;
    renderRiskSeverityGraph: (divContainer: HTMLDivElement) => void;
    renderObligationTypeGraph: (divContainer: HTMLDivElement) => void;
    renderFunctionGraph: (divContainer: HTMLDivElement) => void;
    renderLocationGraph: (divContainer: HTMLDivElement) => void;
    renderJurisdictionGraph: (divContainer: HTMLDivElement) => void;
    renderSubcategoryGraph: (divContainer: HTMLDivElement) => void;
    renderFrequencyGraph: (divContainer: HTMLDivElement) => void;
    renderRiskGraph: (divContainer: HTMLDivElement) => void;
    populateGraphDataBarPart: (partData: any) => any;
    populateGraphDataBarLate: (lateData: any) => any;
    populateGraphDataBarCompliance: (complianceData: any) => any;
    populateGraphDataPie: (pieData: any) => any;
    renderPieCsv: (pieData: any, csv: string, param: string) => string;
    renderGraph: (divContainer: HTMLDivElement, pieData: any, partData: any, lateData: any, complianceData: any, param: string) => void;
    renderEventDetail: (event: any, mmddyyyy: any, currentColumnButton: HTMLButtonElement | null) => void;
    renderCalendar: () => void;
    matchesOnBoardingFilter: (country: string, state: string, subcategory: string, statute: string) => boolean;
    applyAndReloadTagging: (e: any, colName: string, taggingArray: any, sourceArray: any, divElement: any) => void;
    getDataValue: (jsonData: any, id: string) => any;
    getColsValue: (jsonData: any, id: string) => any;
    saveMapping: (divElement: any, uploadBlock: number, jsonData: any, extraFields: any, searchString: string, uploadFunction: any, refreshFunction: any, saveInBackground?: boolean) => Promise<void>;
    saveTagging: (mapping: any, uploadFunction: any, refreshFunction: any, saveInBackground: boolean) => Promise<void>;
    renderTaggingTable: (divElement: any, sourceArray: any, taggingArray: any, sourceCols: any, uploadFunction: any, refreshFunction: any, colName: any, uniqCols: Array<any>, apiIdDropdown: string, dropdownSearchPhrase: any, mandatoryFields: any, jobs: any, anotherProjection: any, extraFields: Array<string>, arrFeedbackReference: any, proposedUsersLabel: string, subfilter: string) => void;
    renderMappingTable: (divElement: any, jsonData: Array<any>, cursor: Array<any>, fetchFunction: any, searchString: string, mappedArray: any, found: number, uploadFunction: any, refreshFunction: any, extraFields: Array<string>, uploadBlock: number, extraFieldPosition: number, colName: string, subfilter: string, statuteColName: string, extraHintsArr: Array<string>) => void;
    refreshCalendar: () => Promise<void>;
    renderNewOnboarding: () => void;
    renderOnboardingSignoff: (signoff: any) => void;
    renderOnboardingCalendar: (calendarJobs: any) => void;
    renderOnboardingTriggers: (mappedTriggers: any, mappedSerializedAlertSchedules: any, triggersJobs: any) => void;
    renderOnboardingInternalControls: (mappedInternalControls: any, mappedSerializedTriggers: any, internalcontrolsJobs: any) => void;
    renderOnboardingAlertSchedules: (mappedAlertSchedules: any, mappedSerializedExtensions: any, alertschedulesJobs: any) => void;
    renderOnboardingExtensions: (mappedExtensions: any, mappedSerializedDuedates: any, extensionsJobs: any) => void;
    renderOnboardingDuedates: (mappedDuedates: any, mappedSerializedMakerCheckers: any, duedatesJobs: any) => void;
    renderOnboardingReporters: (mappedReporters: any, mappedSerializedTags: any, reportersJobs: any, arrFeedbackReference: any) => void;
    renderOnboardingApprovers: (mappedApprovers: any, mappedSerializedReporters: any, approversJobs: any, arrFeedbackReference: any) => void;
    renderOnboardingFunctionHeads: (mappedFunctionHeads: any, mappedSerializedApprovers: any, functionHeadsJobs: any, arrFeedbackReference: any) => void;
    renderOnboardingMakerCheckers: (mappedMakerCheckers: any, mappedSerializedDocs: any, makerCheckerJobs: any) => void;
    renderOnboardingDocs: (mappedDocs: any, mappedSerializedViewers: any, docsJobs: any) => void;
    renderOnboardingAuditors: (mappedAuditors: any, mappedSerializedFunctionheads: any, auditorsJobs: any, arrFeedbackReference: any) => void;
    renderOnboardingViewers: (mappedViewers: any, mappedSerializedAuditors: any, viewersJobs: any, arrFeedbackReference: any) => void;
    renderOnboardingTags: (mappedTags: any, mappedSerializedFunctions: any, tagsJobs: any) => void;
    renderOnboardingFunctions: (mappedFunctions: any, mappedSerializedLocations: any, functionsJobs: any) => void;
    renderOnboardingLocations: (mappedLocations: any, mappedSerializedEntities: any, locationsJobs: any) => void;
    renderOnboardingCompliances: (mappedStatutes: any, mappedCompliances: any) => void;
    renderOnboardingEntities: (mappedEntities: any, mappedSerializedCountries: any, entitiesJobs: any, arrFeedbackReference: any) => void;
    renderOnboardingCountries: (mappedCountries: any, mappedCompliances: any, countriesJobs: any) => void;
    renderOnboardingStatutes: (mappedStatutes: any) => void;
    clickOnboardingTabs: () => void;
    renderOnboardingStatus: (status: any) => void;
    renderClearOnboardingContent: () => void;
    renderOnboardingTabs: () => Promise<void>;
    renderRcmProceed: (div: HTMLDivElement, button: HTMLButtonElement | null) => void;
    renderRcmSelectedComplianceInProject: (div: HTMLDivElement) => void;
    renderRcmCompliances: (updatedCompliances: any) => void;
    renderRcmLockedCompliances: (lockedCompliances: any) => void;
    renderRcmUnlockedCompliances: (lockedCompliances: any) => void;
    renderRcmProjects: (div: HTMLDivElement, projects: any) => void;
    renderRcmSelectedDate: (div: HTMLDivElement) => void;
    renderRcmDate: (div: HTMLDivElement) => void;
    renderRcmJobs: (div: HTMLDivElement) => void;
    renderRcmSelectedJobs: (div: HTMLDivElement, jobs: any) => void;
    renderRcmNotifications: (notifs: any) => void;
    renderRcmTabs: () => void;
    proceedToCalendar: () => Promise<void>;
    renderRoleTabs: () => void;
    csvmaker: (data: any) => string;
    renderChartSettingsFilters: (container: HTMLDivElement, ctx: any) => void;
    renderChartSettingsSettings: (container: HTMLDivElement) => void;
    renderChartSettings: (container: HTMLDivElement, selectedTab: number | undefined, ctx: any) => void;
    csvToHtmlTable: (strCsv: string) => string;
    getFilteredString: () => string;
    formatLabel: (str: string, maxwidth: number) => any;
    renderChart4: (ctx: any, type: any, data: any, title: string) => void;
    renderChart3: (ctx: any, type: any, data: any, title: string) => void;
    renderChart2: (ctx: any, type: any, data: any, title: string) => void;
    renderChart: (ctx: any, type: any, data: any, title: string) => void;
    copy: (aObject: any) => any;
    processGraphHide: (clickedValue: string, hide: boolean) => void;
    processGraphFilter: (clickedValue: string) => void;
    processClickOnLegend: (index: number, legendItem: any) => void;
    clickOnLegend: (hide: boolean, label: string) => void;
    clickOnPie: (callingFromBar: boolean, pieIndex: number) => void;
    clickOnBar: (callingFromPie: boolean, graphNumber: number, barIndex: number) => void;
    getCurrentTab: () => string;
    renderTabs: (selectedTab: string) => void;
    renderMappingTabs: (selectedTab: string) => void;
    renderExpandEvent: (events: any, index: any) => void;
    renderMapping: (unmappedEvents: any) => void;
    applyFilter: (filter?: string) => void;
    getIndexFromId: (id: string) => number;
    prepopulateMapping: (mappings: any) => void;
    clearAllMappingSelections: () => void;
    clearAllCalendars: () => void;
    transformMappingsForUpload: (mapping: any) => {
        duedates: any;
        tags: any;
        users: any;
    };
    uploadTriggersMapping: (data: any) => Promise<void>;
    uploadInternalControlsMapping: (data: any) => Promise<void>;
    uploadAlertSchedulesMapping: (data: any) => Promise<void>;
    uploadDuedatesMapping: (data: any) => Promise<void>;
    uploadExtensionsMapping: (data: any) => Promise<void>;
    uploadApproversMapping: (data: any) => Promise<void>;
    uploadFunctionHeadsMapping: (data: any) => Promise<void>;
    uploadMakerCheckersMapping: (data: any) => Promise<void>;
    uploadDocsMapping: (data: any) => Promise<void>;
    uploadAuditorsMapping: (data: any) => Promise<void>;
    uploadViewersMapping: (data: any) => Promise<void>;
    uploadReportersMapping: (data: any) => Promise<void>;
    uploadTagsMapping: (data: any) => Promise<void>;
    uploadFunctionsMapping: (data: any) => Promise<void>;
    uploadLocationsMapping: (data: any) => Promise<void>;
    uploadEntitiesMapping: (data: any) => Promise<void>;
    uploadCountriesMapping: (data: any) => Promise<void>;
    uploadOnboardingMapping: (data: any, onboardingstep: string) => Promise<void>;
    uploadCompliancesMapping: (data: any) => Promise<void>;
    uploadStatutesMapping: (data: any) => Promise<void>;
    uploadUnTriggerEvent: (eventid: string, mmdd: string) => Promise<void>;
    uploadTriggerEvent: (entityId: string, locationId: string, eventid: string, dateofoccurrence: string) => Promise<void>;
    uploadAudit: (entityId: string, locationId: string, mmddyyyy: string, eventid: string, comments: string, approved: any) => Promise<void>;
    uploadReview: (entityId: string, locationId: string, mmddyyyy: string, eventid: string, comments: string, approved: any) => Promise<void>;
    uploadReport: (entityId: string, locationId: string, mmddyyyy: string, eventid: string, comments: string, doc: string, docs: any) => Promise<void>;
    uploadMapping: () => Promise<void>;
    uploadEvents: () => Promise<void>;
    uploadReprogramTrigger: (eventid: string, timestamp: string) => Promise<void>;
    processEvent: (value: any) => void;
    renderChosenProject: (events?: any) => void;
    fetchRcmLockedCompliances: (lockedCompliances: Array<string>) => Promise<any>;
    fetchCancelOnboardingJob: (onboardingStep: string) => Promise<any>;
    fetchGetStoredMapping: (flow: string) => Promise<any>;
    fetchUpdateUsermap: (usermap: any) => Promise<void>;
    fetchUpdateRcmLock: (complianceId: string) => Promise<any>;
    fetchDetailProject: (projectId: string) => Promise<any>;
    fetchDeleteReview: (eventId: string, mmddyyyy: string, entityId: string, locationId: string) => Promise<any>;
    fetchSearchStatutes: (searchString: string, cursor?: string) => Promise<any>;
    fetchSearchCompliances: (searchString: string, cursor: string | undefined, count: number, length: number) => Promise<any>;
    fetchMappedProjects: () => Promise<any>;
    fetchOnboardingStatus: () => Promise<any>;
    fetchGetSignOff: () => Promise<any>;
    fetchUpdateSignOff: (signoffText: string, signature: string) => Promise<any>;
    fetchMappedCompliances: () => Promise<any>;
    fetchMappedSerializedExtensions: () => Promise<any>;
    fetchMappedSerializedAlertSchedules: () => Promise<any>;
    fetchMappedSerializedTriggers: () => Promise<any>;
    fetchMappedSerializedDuedates: () => Promise<any>;
    fetchMappedSerializedApprovers: () => Promise<any>;
    fetchMappedSerializedFunctionheads: () => Promise<any>;
    fetchMappedSerializedMakerCheckers: () => Promise<any>;
    fetchMappedSerializedDocs: () => Promise<any>;
    fetchMappedSerializedAuditors: () => Promise<any>;
    fetchMappedSerializedViewers: () => Promise<any>;
    fetchMappedSerializedReporters: () => Promise<any>;
    fetchMappedSerializedTags: () => Promise<any>;
    fetchMappedSerializedLocations: () => Promise<any>;
    fetchMappedSerializedFunctions: () => Promise<any>;
    fetchMappedSerializedEntities: () => Promise<any>;
    fetchSerializedMapping: (onboardingstep: string) => Promise<any>;
    fetchSerializedPartByPart: (url: string) => Promise<any>;
    fetchMappedSerializedCountries: () => Promise<any>;
    fetchMappedTriggers: () => Promise<any>;
    fetchMappedInternalControls: () => Promise<any>;
    fetchMappedAlertSchedules: () => Promise<any>;
    fetchMappedExtensions: () => Promise<any>;
    fetchMappedDuedates: () => Promise<any>;
    fetchMappedReporters: () => Promise<any>;
    fetchMappedApprovers: () => Promise<any>;
    fetchMappedFunctionHeads: () => Promise<any>;
    fetchMappedMakerCheckers: () => Promise<any>;
    fetchMappedDocs: () => Promise<any>;
    fetchMappedAuditors: () => Promise<any>;
    fetchMappedViewers: () => Promise<any>;
    fetchMappedTags: () => Promise<any>;
    fetchMappedLocations: () => Promise<any>;
    fetchMappedFunctions: () => Promise<any>;
    fetchMappedEntities: () => Promise<any>;
    fetchMappedCountries: () => Promise<any>;
    fetchMappedOnboarding: (onboardingstep: string) => Promise<any>;
    fetchUpdatedCompliances: (nextBackwardToken?: string) => Promise<any>;
    fetchMappedStatutes: () => Promise<any>;
    fetchCreateRcmJob: (complianceid: string, data: any, triggerDate: string, triggerMessage: string, projects: any) => Promise<any>;
    fetchRcmNotifications: (projectid: string) => Promise<any>;
    fetchRcmJobs: (complianceid: string) => Promise<any>;
    fetchInternalControlsJobs: () => Promise<any>;
    fetchExtensionsJobs: () => Promise<any>;
    fetchAlertSchedulesJobs: () => Promise<any>;
    fetchDueDatesJobs: () => Promise<any>;
    fetchApproversJobs: () => Promise<any>;
    fetchFunctionHeadsJobs: () => Promise<any>;
    fetchMakerCheckersJobs: () => Promise<any>;
    fetchDocsJobs: () => Promise<any>;
    fetchAuditorsJobs: () => Promise<any>;
    fetchViewersJobs: () => Promise<any>;
    fetchReportersJobs: () => Promise<any>;
    fetchTagsJobs: () => Promise<any>;
    fetchLocationsJobs: () => Promise<any>;
    fetchCountriesJobs: () => Promise<any>;
    fetchEntitiesJobs: () => Promise<any>;
    fetchFunctionJobs: () => Promise<any>;
    fetchCalendarJobs: () => Promise<any>;
    fetchDetail: (value: any) => Promise<void>;
    fetchGetMappedCalendar: (year: string) => Promise<any>;
    sleepFunction: (ms: number) => Promise<unknown>;
    renderAppropriateStream: (startDate: string, endDate: string) => void;
    fetchAndYearlyRenderUserCalendar_2: (startDate?: string, endDate?: string, searchString?: string) => Promise<void>;
    fetchUserCalendar: () => Promise<void>;
    fetchCalendar: () => Promise<void>;
    fetchReprogramAdhoc: () => Promise<void>;
    fetchAdhoc: (reprogramTriggers?: boolean, startDate?: string, endDate?: string) => Promise<void>;
    fetchEventMap: () => Promise<void>;
    fetchList: () => Promise<void>;
    initCalendar: () => Promise<void>;
    initInputs: () => void;
    showChooseProject: () => void;
    showChosenProject: () => void;
    showChosenMapping: () => void;
    truncate: (str: string, n: number, useWordBoundary: boolean, ellipsis?: boolean) => string;
    initListenersAdmin: () => void;
    loadMode: () => Promise<void>;
    constructor();
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    connectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sf-i-events': SfIEvents;
    }
}
//# sourceMappingURL=sf-i-events.d.ts.map