const INTRODUCTION_AND_IDENTIFICATION_TEMPLATE = `
((patientName)) was referred by ((referringOrganization|upper)). The subject was tested and interviewed on ((appointmentDate|date)). The principal examiner was ((providerName)) and was unassisted in this examination. The purpose of this examination was to determine the presence, if any, of emotional or intellectual characteristics which would detrimentally affect the subject’s performance as a ((intervieweeRole|upper)).<<BREAK>>
Factors considered include intelligence, judgment, freedom from emotional disorder incompatible with effective performance in a public safety role, personality traits related to teamwork, impulse control, openness to direction and criticism, persistence in difficult or repetitive tasks, and willingness to provide service. Also assessed were attitudes, toward the use of force, presence of bias, writing ability, and other characteristics deemed critical for the role of ((intervieweeRole|upper)).<<BREAK>>
((patientName)) is of ((patientHeightCategory|lower)) height and has a ((patientFrameSize|lower)) frame with a ((patientBodyBuild|lower)) build. ((he)) is reportedly ((heightFeet))ft ((heightFeet))in in height and weighs ((patientWeight)) pounds. The subject, ((wasOnTime|lower)) on time for their appointment. ((she)) was dressed ((dressed|lower)) for this visit and was ((looked|lower)). Rapport ((rapportEstablished|lower)) easily established and ((she)) ((eyeContact|lower)) maintain good eye contact and speech ((speechArticulate|lower)) articulate and coherent. ((patientName)) ((politeCooperative|lower)) polite and cooperative throughout the interview and assessment. ((she)) ((relaxedConfident|lower)) appear to be relaxed and confident upon introductions and ((spokeFreely|lower)) speak freely during questing and conversation. The subject, interpersonal and verbal skills were deemed to be ((verbalSkills|lower)). Affect ((affectAppropriate|lower)) normal and appropriate to the situation. The subject’s presentation ((presentationValid|lower)) judged to have been authentic and valid.<<BREAK>>
The subject’s stream of thought, as manifested by their speech ((thoughtStreamNormal|lower)) free from associational disturbance and they ((articulateThoughts|lower)) able to articulate their thoughts in an appropriate manner. ((she)) ((alertOriented|lower)) alert, and oriented to person, place and time. There ((memoryImpairment|lower)) indication of impairment in recent or remote memory, and immediate recall ((immediateRecall|lower)) appear to be intact. Concentration and attention ((concentrationAttention|lower)) within normal limits. There ((psychDisturbance|lower)) report or indication that the subject suffers from aberrant perceptual phenomena, psychotic thought process, or other forms of serious psychological disturbance. ((she)) ((suicidalIdeation|lower)) the experience of suicidal or homicidal ideation.
`

const REASON_FOR_REFERRAL_TEMPLATE = `
The examinee was referred for a psychological opinion regarding their ability to perform the duties required of a ((intervieweeRole|upper)). This occurred because on ((dateOfIncident|date)) ((patientName)) was involved in an office-involved shooting, during which ((she)) discharged ((her)) weapon and ((sustainedInjury|lower)) sustain ((injurySeverity)) injury ((injuryLocation)). ((She)) ((onAdministrativeDuty|lower)) been on administrative duty since that time. Thus, the question is whether the examinee is fit to continue duty without any restrictions or whether there are needed interventions that will enable them to function in an appropriate manner as a ((intervieweeRole|upper)).
`
const REVIEW_OF_RECORDS_TEMPLATE = `
The department forwarded a description of the incident at the time of referral. This stated that, “((incidentDescription))”.`

const INTERVIEW_SUMMARY_TEMPLATE = `
((patientName)) was interviewed for 45 minutes on ((appointmentDate|date)). The interview consisted of a discussion of why ((she)) was referred, a social history, and a clinical status examination.<<BREAK>>

NOTE: UNLESS OTHERWISE SPECIFIED, HISTORY GIVEN BELOW WAS
OBTAINED FROM THE SUBJECT AND IS NOT INDEPENDENTLY VERIFIED
BY IFP. ANY DISCREPANCIES BETWEEN INFORMATION CONTAINED
HEREIN AND FACTUAL BACKGROUND MAY IMPLY FALSIFICATION BY THE
SUBJECT. AS NOTED EARLIER, NO DISCUSSION WAS INCLUDED WHICH
KNOWINGLY IMPINGED UPON AREAS PROPOSED FOR LITIGATION.
`

const HISTORY_TEMPLATE = `
((patientName)) is a ((patientAge)) year old ((relationshipStatus)) ((gender|lower)) currently living in ((currentCity)). ((She)) ((hasChildren|lower)) have children.`

const EMPLOYMENT_TEMPLATE = `
The subject has worked for the state department since ((employedSinceMonth)), ((employedSinceYear)). Prior to that, they worked for ((priorPosition)) for ((positionDuration)). They ((hadDisciplinary)) had disciplinary write-ups/actions while employed((disciplinaryIncident|prependColonIfPresent)).<<BREAK>>
  
((handgunDescription))`

const MILITARY_TEMPLATE = `
((patientName)) ((hasMilitaryExperience|lower)) report having military experience((militaryBranch|prependEnlistIfPresent)).
`
const MEDICAL_TEMPLATE = `
The subject ((hasAnxietyHistory|lower)) have a history of anxiety. They ((hasDepressionHistory|lower)) have a history of depression and ((hasHeadInjuryHistory|lower)) have any history of a head injury. ((patientName)) ((hasLifeThreateningInjuryHistory|lower)) having a life-threatening injury or illness in the past five years.
`
const LEGAL_TEMPLATE = `
((patientName)) ((hasLegalHistory|lower)) have a history of legal difficulties((legalHistoryDetails|prefixColon)). They ((hasRestrainingOrder|lower)) been the subject of a restraining order((restrainingOrderDetails|prefixColon)). The subject ((hasCivilLitigation|lower)) been involved in civil litigation((civilLitigationDetails|prefixColon)). Their motor vehicle record is ((motorVehicleRecord))((motorVehicleRecordDetails|prefixColon)).
`
const FAMILY_HISTORY_TEMPLATE = `((familyHistoryDetails))`

const EDUCATION_TEMPLATE = `
((patientName)) reports that they were ((highSchoolPerformance)) student in high school. ((postHighSchoolEducation))
`

const ALCOHOL_AND_DRUGS_TEMPLATE = `
((patientName)) reported drinking ((alcoholFrequency)) times per week and consuming ((drinksPerSitting)) beverages at each sitting. In the last year the greatest number of drinks consumed on occasion, according to the subject, is ((maxAlcoholConsumed)). ((he)) reports that there ((concernAboutDrinking|lower)) been expressed concern about their current drinking habits and that there ((historyOfDrinkingProblems|lower)) history of problems related to drinking. ((he)) ((alcoholTreatmentHistory|lower)) been in an alcohol treatment program((alcoholTreatmentProgram)). ((patientName)) ((useOfIllicitDrugs)) involvement with illicit or illegal drugs, and ((marijuanaWhileEmployed|lower)) used marijuana while employed with the state. Furthermore, the subject ((useOfEnhancingDrugs|lower)) used steroids, human growth hormone or other illicit performance enhancing drugs.
`
const IMPULSE_CONTROL_TEMPLATE = `
((patientName)) ((historyOfViolenceAsAdult)) any history of fighting or violence as an adult and ((historyOfDomesticViolence)) have a history of domestic violence. ((He)) ((reportsImpulsivity)) impulsivity in spending, speech or reckless behavior. The subject ((hasBankruptcyOrPoorCredit|lower)) been bankrupt and depicted his credit history as good.
`
const COLLATERAL_INTERVIEWS_TEMPLATE = `((higherUpSummary))
`

const SUMMARY_AND_RECOMMENDATIONS_TEMPLATE = `
((patientName)) is a ((age)) year old ((relationshipStatus)) ((gender|lower)), who has worked as a ((intervieweeRole)) for the Department of Safety since ((employedSinceMonth)), ((employedSinceYear)).<<BREAK>>
((summaryRecommendation))
Based upon these results it is concluded and recommended that:<<BREAK>>
1: ((patientName)) ((isFitForDuty|lower)) fit for duty as a ((intervieweeRole)). That is ((he)) ((hasPsychologicalDisorderAffectingFunction|lower)) suffering from a clinically significant, diagnosable psychological disorder that would limit their ability to perform the essential functions of the job or pose a direct threat to the health and safety of themself or others.<<BREAK>>
2: Suicidal Risk ((isSuicidalRiskEvident)) evident.<<BREAK>>
3: ((he)) ((isWeaponMisuseThreat)) appear to be a threat to misuse their weapon against self and others.<<BREAK>>
4: There ((hasReasonableAccommodation|lower)) reasonable accommodations necessary that would help the subject perform differently on the job as a ((intervieweeRole)).((recommendedAccommodations))<<BREAK>>
5: I ((providerGaveRecommendationsToSubject|lower)) detail recommendations to the subject.((didNotExplainWhy))
`
const IMPORTANT_INFORMATION_TEMPLATE = `

This consultation report is intended to determine whether this employee’s psychological functioning or a mental health problem renders the employee unable to perform the full duties of a Trooper, and/or creates an unacceptably high risk of such inability.

This evaluation should not be ordered for a punitive purpose or in lieu of possible disciplinary actions. Final recommendations contained in this report should be viewed in the context of a professional opinion based on psychological instruments and procedures believed to be valid and reliable.

The findings in this report should not be construed as an opinion by the examiner as to what final administrative actions should be taken regarding the employee, i.e., disciplinary actions, return to duty, retirement, termination, change of assignment, etc.

Final decisions regarding this matter and administrative actions taken must ultimately be made by the appropriate officials of the referring agency, after consideration and review of all relevant factors and background concerning this employee.
`
const templateSections = [
  {
    key: 'introduction',
    heading: 'Introduction and Identification',
    template: INTRODUCTION_AND_IDENTIFICATION_TEMPLATE,
  },
  {
    key: 'specificReason',
    heading: 'Specific Reason for Referral',
    template: REASON_FOR_REFERRAL_TEMPLATE,
  },
  {
    key: 'reviewOfRecords',
    heading: 'Review of Records',
    template: REVIEW_OF_RECORDS_TEMPLATE,
  },
  {
    key: 'resultsOfInterview',
    heading: 'Results of Interview',
    template: INTERVIEW_SUMMARY_TEMPLATE,
  },
  { key: 'history', heading: 'History', template: HISTORY_TEMPLATE },
  { key: 'employment', heading: 'Employment', template: EMPLOYMENT_TEMPLATE },
  { key: 'military', heading: 'Military', template: MILITARY_TEMPLATE },
  { key: 'medical', heading: 'Medical', template: MEDICAL_TEMPLATE },
  { key: 'legal', heading: 'Legal', template: LEGAL_TEMPLATE },
  {
    key: 'familyHistory',
    heading: 'Family History',
    template: FAMILY_HISTORY_TEMPLATE,
  },
  { key: 'education', heading: 'Education', template: EDUCATION_TEMPLATE },
  {
    key: 'alcoholAndDrugs',
    heading: 'Alcohol and Drugs',
    template: ALCOHOL_AND_DRUGS_TEMPLATE,
  },
  {
    key: 'impulseControl',
    heading: 'Impulse Control',
    template: IMPULSE_CONTROL_TEMPLATE,
  },
  {
    key: 'collateral',
    heading: 'Collateral Interviews',
    template: COLLATERAL_INTERVIEWS_TEMPLATE,
  },
  {
    key: 'summary',
    heading: 'Summary and Recommendations',
    template: SUMMARY_AND_RECOMMENDATIONS_TEMPLATE,
  },
  {
    key: 'importantNote',
    heading: 'Important Information',
    template: IMPORTANT_INFORMATION_TEMPLATE,
  },
]

export {
  INTRODUCTION_AND_IDENTIFICATION_TEMPLATE,
  REASON_FOR_REFERRAL_TEMPLATE,
  REVIEW_OF_RECORDS_TEMPLATE,
  INTERVIEW_SUMMARY_TEMPLATE,
  HISTORY_TEMPLATE,
  EMPLOYMENT_TEMPLATE,
  MILITARY_TEMPLATE,
  MEDICAL_TEMPLATE,
  LEGAL_TEMPLATE,
  FAMILY_HISTORY_TEMPLATE,
  EDUCATION_TEMPLATE,
  ALCOHOL_AND_DRUGS_TEMPLATE,
  IMPULSE_CONTROL_TEMPLATE,
  COLLATERAL_INTERVIEWS_TEMPLATE,
  SUMMARY_AND_RECOMMENDATIONS_TEMPLATE,
  IMPORTANT_INFORMATION_TEMPLATE,
  templateSections,
}
