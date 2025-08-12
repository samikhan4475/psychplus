import { TemplateSection } from '@/ui/fit-for-duty-psych-eval/widget/types'

const ASSESSMENT_SUMMARY_TEMPLATE = `
((referringOrganization)) referred ((patientName)) to PsychPlus for psychological examination. ((patientName)) was tested and interviewed on ((appointmentDate|date)). The principal examiner was ((providerName)), a licensed psychologist in the State of ((visitState)). The principal psychologist was unassisted in the examination.<<BREAK>>
The purpose of this examination was to determine the presence, if any, of emotional or intellectual characteristics which would detrimentally affect ((patientName))'s performance. Factors considered are those generally agreed to be crucial to effective performance in the role of ((intervieweeRole|withOptionalDot))
`

const INTERVIEW_FINDINGS_TEMPLATE = `
((patientName)) is of ((patientHeightCategory)) height and has a ((patientFrameSize)) but ((patientBodyBuild)) build. ((he)) is reportedly ((heightFeet)) feet ((heightInches)) inches in height and weighs ((patientWeight)) pounds.

((patientName)) ((onTime|lower)) on time for their appointment. ((he)) was dressed ((dressed)) for this visit and was ((appearance|lower)) in appearance. Rapport ((rapport|lower)) easily established with ((patientName)). ((he)) ((eyeContact|lower)) maintain good eye contact and ((speech|lower)) articulate and coherent. ((patientName)) ((polite|lower)) polite and cooperative throughout the interview and assessment. ((he)) ((relaxed|lower)) appear to be relaxed and confident upon introduction and ((spokeFreely|lower)) speak freely during questioning and conversation. The subject’s interpersonal and verbal skills were deemed to be ((interpersonalSkills|lower)). Affect ((affect|lower)) normal and appropriate to the situation. Presentation ((presentation|lower)) judged to have been authentic and valid.<<BREAK>>
  • The subject’s stream of thought, as manifested by their speech ((thoughtStream|lower)) free from associational disturbance and they ((articulateThoughts|lower)) able to articulate their thoughts in an appropriate manner.<<BREAK>>
  • Subject ((alertness|lower)) alert, and oriented to person, place and time.<<BREAK>>
  • There ((memoryImpairment|lower)) indication of impairment in recent or remote memory, and immediate recall ((immediateRecall|lower)) appear intact.<<BREAK>>
  • There ((psychologicalDisturbance|lower)) report or indication that the subject suffers from unusual preoccupations, or aberrant perceptual phenomena, psychotic thought process, or other forms of serious psychological disturbance.<<BREAK>>
  • The subject ((suicidalIdeation)) the experience of suicidal or homicidal ideation, remote or recent.<<BREAK>>
((patientName)) is a ((patientAge)) year old ((gender|lower)) who is ((relationshipStatus|lower)) and currently living in ((currentCity)), ((livingArrangement|lower)). ((patientName)) was born in ((placeOfBirth)) and raised in ((placeRaised)).<<BREAK>>
((familyHistoryDetails)).<<BREAK>>The subject’s previous employer is ((previousEmployer)), they worked there for ((durationAtPreviousEmployer)). Prior to that, they ((priorEmployment)). The subject ((hasDisciplinaryActions|lower)) had disciplinary write-ups/actions while employed((disciplinaryIncidentDescription|prependColonIfPresent)). ((useOfForceOrComplaints))<<BREAK>>
UNLESS OTHERWISE SPECIFIED, THE PERSONAL HISTORY GIVEN DURING THE INTERVIEW WAS OBTAINED FROM THE SUBJECT AND NOT INDEPENDENTLY VERIFIED BY PSYCH PLUS. SUBJECTS ARE INFORMED THAT LYING OR WITHHOLDING RELEVANT INFORMATION MAY RESULT IN A RECOMMENDATION TO REJECT. DISCREPANCIES BETWEEN HISTORY AS GIVEN AND BACKGROUND FINDINGS MAY IMPLY FALSIFICATION BY THE SUBJECT.
`
const CANIDATE_RATINGS = `
THE FOLLOWING RATING DERIVE FROM THE SUBJECT’S RESPONSES TO BIOGRAPHICAL AND ATTITUDINAL QUESTIONS AND INTERVIEW TASKS AND BACKGROUND INFORMATION. FOR MORE DETAIL, SEE THE CONSIDERATIONS AND RECOMMENDATIONS SECTION. ANY DISCREPANCIES BETWEEN ACTUAL LIFE HISTORY AND THAT GIVEN HERE ARE DUE TO INACCURATE RESPONSES BY THE SUBJECT. EMPLOYMENT DECISIONS SHOULD NOT BE MADE ON THE BASIS OF TEST RESULTS ALONE.<<BREAK>>
`

const CONSIDERATIONS_ROD = `
((patientName)) completed a detailed biographical questionnaire and social history interview, examining their developmental history, family of origin, educational history, marital and family status, and employment status and history. Any concerns regarding legal, military, sexual, financial, social, medical, or firearm issues or incidents were also explored. Finally, ((she)) was queried about current and past drug use, and current alcohol use patters. After an examination of this information, there ((disqualifyingRisk|lower)) risk factors identified that were deemed of sufficient concern to disqualify the candidate.<<BREAK>>
((he)) appears ((socialAdjustment|lower)) adequately adjusted socially, both in terms of family history, and recent and remote personal history. ((patientName)) ((hasLegalHistory|lower)) have a history of legal difficulties((legalHistoryDetails|prependColonIfPresent)). They ((hasRestrainingOrder|lower)) been the subject of a restraining order((restrainingOrderDetails|prependColonIfPresent)). The subject ((hasCivilLitigation|lower)) been involved in civil litigation((civilLitigationDetails|prependColonIfPresent)). Their motor vehicle record is ((motorVehicleRecord))((motorVehicleRecordDetails|prependColonIfPresent)).<<BREAK>>
((patientName)) reported drinking ((alcoholFrequency|splitNumberLower)) times per week and consuming ((drinksPerSitting|splitNumberLower)) beverage(s) at each sitting. In the last year, the greatest number of drinks consumed on occasion, according to subject, is ((maxAlcoholConsumed)). ((he)) reports that there ((concernAboutDrinking|lower)) been expressed concern about their current drinking habits and that there ((historyOfDrinkingProblems|lower)) a history of problems related to drinking. ((he)) ((alcoholTreatmentHistory|lower)) been in an alcohol treatment program((alcoholTreatmentProgram|prependColonIfPresent)). ((patientName)) ((useOfIllicitDrugs)) involvement with illicit or illegal drugs, and ((marijuanaWhileEmployed|lower)) used marijuana while employed with the state. Furthermore, the subject ((useOfEnhancingDrugs|lower)) used steroids, human growth hormone or other illicit performance enhancing drugs. The likelihood of a drug or alcohol-related incident is deemed ((incidentRiskLikelihood)).<<BREAK>>
The results of personality assessment indicate that ((she)) ((respondedCandidly|lower)) respond consistently and candidly and ((emotionalDistress|lower)) reflect the presence of significant levels of emotional distress or psychological disturbance that would make ((him)) unsuitable for the position sought. ((he)) does not qualify for an ICD-10 diagnosis. There ((historyOfPsychologicalIssues|lower)) indication in ((his)) history of anxiety, depression or other psychological disturbances. ((he)) ((treatmentFromProfessional|lower)) received treatment from a mental health professional and ((takenMedication|lower)) taken medication for symptoms of a psychological disorder. ((he)) ((headInjuryHistory|lower)) a history of head injury or any history of life-threatening injuries or illnesses in the past five years.<<BREAK>>
The overall Global Prediction Scale, which is considered the best single bio-data predictor of candidate success, indicated that this individual is likely to prove ((globalPrediction)) as a public safety employee. Bio-data ratings reflect ((biodataRatings)) overall social adjustment, self-discipline and motivational level. Ratings also indicate that ((his)) team orientation is ((teamOrientation)) and that ((her)) deference towards authority is ((authorityDeference)). ((he)) ((followOrders|lower)) be willing to follow orders and accept supervision and work effectively within a chain of command. ((he)) should also react ((feedbackReaction)) to direct feedback regarding their performance and ((takeResponsibility|lower)) take responsibility for the decisions and mistakes. ((he)) appears to be ((acceptCriticism)) of criticism and will likely take direction ((takeDirection|lower)) resistance. Overall, the data suggests that ((she)) is likely to earn ((supervisorRatings)) supervisor ratings and will interact and work ((interactionWithOthers)) with other officers and the public. Results also indicate that this subject ((treatsOthersFairly|lower)) treat others honestly and fairly and ((taskCompletion|lower)) complete important tasks in an organized and timely manner. ((Her)) response to the written scenario fell within the ((scenarioResponseQuality|lower)) range, reflecting ((analyticalAbility)) analytical abilities and common sense. ((Her)) writing skills appear to be ((writingSkills)) in meeting job demands for written documentation. Bio-data ratings also suggest that ((she)) will show ((judgmentOnJob)) judgment on the job and display ((impulseControl)) impulse control. ((Her)) service orientation is ((serviceOrientation)), and ((she)) ((aggressiveTraits|lower)), display signs of aggressive attitudes or traits, authoritarian attitudes, or gender biases which would put ((him)) at risk for overly assertive behavior or abuse of authority in conflicted or stressful situations, or if ((she)) is challenged or provoked in ((his)) dealings with the public. There ((disqualifyingRisk|lower)) risk factors identified that were deemed of sufficient concern to disqualify the candidate. In the absence of any background investigation that contradicts available biodata, assessment and interview data, the results of this evaluation indicate that this candidate provides an ((overallAssessment)), profile match for the position sought. ((he)) ((finalRecommendation|lower)), be recommended.
`
const templateSections: TemplateSection[] = [
  {
    key: 'assessment summary',
    heading: 'Assessment Summary:',
    template: ASSESSMENT_SUMMARY_TEMPLATE,
  },
  {
    key: 'nterview findings',
    heading: 'Interview Findings:',
    template: INTERVIEW_FINDINGS_TEMPLATE,
  },
  {
    key: 'canidate ratings',
    heading: 'Canidate Ratings:',
    template: CANIDATE_RATINGS,
  },

  {
    key: 'considerations review of data',
    heading: 'Consideration in Review of Data:',
    template: CONSIDERATIONS_ROD,
  },
]

export { templateSections }
