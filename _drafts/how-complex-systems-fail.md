---
layout: post
title: "«Как рушатся комплексные системы», Ричард И. Кук»
description: "Книга о человечности в дизайне продуктов"
keywords: ["Дизайн", "Design", "Книги", "Книга", "заметки"]
target:    /2014/08/30/emotional-design/
---

## О статье

Эта статья о медицине, а не о программировании. В медицине огромное
количество сложных систем и огромная цена ошибок. Эти системы выходят за рамки программного кода, его архитектуры, организации, и, возможно, эти системы выходят за рамки самой медицины.

Я думаю, что эту статью можно и полезно рассматривать в контексте
программирования. Достаточно интересно переносить выводы статьи на те
системы, которые мы разрабатываем — веб-сайты, различные сервисы,
приложения. Вряд ли, прочитав статью, можно сделать какой-то однозначный
вывод, назвав черное черным, а белое белым, но задуматься, и правда, есть
над чем.

## Как рушатся комплексные системы

### 1. Коплексные системы опасны по своей природе

> Все системы, которые мы рассматриваем (трансплантация, здравоохранение,
> генерация энерции) фактически и к сожалению, опасны по своей природе. 
> Уровень риска периодически изменяется, но те процессы, которые происходят
>  внутри каждой системы по сути не становятся безопаснее. Присутствие опасности
> заставляет создавать защиту от нее, что характеризует эти системы.

### 2. Комплексные системы надежно защищены от ошибок

>  Тяжелые последствия ошибок со временем приводят к построению множества
> слоев для защиты от ошибок. Защита включает в себя различные технические
> компоненты (к примеру, систему резервного копирования,  различные
> предохранители) и человеческие компоненты (такие, как тренинги и знания),
> а так же различную организационную и правовую защиту (различные политики,
> процедуры, сертификации, рабочие правила, командные тренинги). Все
> эти меры должны создать несколько щитов, для защиты от возможной
> катастрофы. 

### 3. К катастрофе приводят несколько ошибок — одной не достаточно

> Эти щиты работают. В целом, система справляется. Катастрофические
> ошибки случаются когда небольшие, кажущиеся безобидными, ошибки
> объединяются, создавая шанс катастрофы. Каждая из этих ошибок
> важна, но только их совокупность приводит к трагедии. Шанс 
> возникновения небольших ошибок гораздо выше, чем явной катастрофы.
> Большинство вероятных траекторий блокируется на уровне архитектуры
> безопасности компонентов системы. Те же траектории, которые
> ведут к инциденту, зачастую блокируются врачами.

### 4. Комплексные системы работают с ошибками, которые остаются незамеченными

> Сложность этих систем ведет к невозможности их функционирования
> без большого количества мелких трещин. Так как этих трещин не достаточно
> для возникновения серьезных ошибок, они рассматриваются, как
> незначительный фактор в процессе работы. Избавиться от всех
> возможных ошибок сложно по большей части из экономической стоимости,
> а также из-за невозможности без реальных фактов увидеть как
> могут объединиться эти ошибки для возникновения катастрофы.  Ошибки
> постоянно меняются, потому что меняются технологии, меняется организация 
> работы и прилагаются определенные усилия для  избавления от возможных
> ошибок.

### 5. Комплексные системы разрушаются в процессе работы

> Из предыдущего пункта выходит, что комплексные системы функционируют 
> в сломанном состоянии. Системы продолжают работать из-за своей 
> избыточности и из-за людей, которые могут заставить их работать
> не смотря на существующие ошибки. После анализа инцидента, практически
> всегда видно, что система имела «прото-инцидент»,  близкий к катастрофе.
> Аргументы о том, что условия, которые привели к деградации системы возможно
> было распознать перед происшествием обычно основываются на достаточно 
> наивном представлении о работе системы. Система постоянно взаимодействует
> с различными компонентами (организационными, техническими, с людьми),
> которые ошибаются и изменяются постоянно.

### 6. Катастрофа происходит на пересечении

> Комплексные системы имеют потенциал катастрофической ошибки.
> Люди, работающие с этими системами, практически всегда находятся
> вблизи, и временная вероятность ошибки может привести к беде.
> Вероятность катастрофы — клеймо комплексных систем. Невозможно
> полностью избавиться от возможной трагедии. Вероятность возникновения
> таких ошибок заложена в самой природе в комплексных систем.

### 7. Попытка понять «основную причину» фундаментально неправильна 

Post-accident attribution to a ‘root cause’ is fundamentally wrong

> Because overt failure requires multiple faults, there is no isolated
> ‘cause’ of an accident. There are multiple contributors to accidents.
> Each of these is necessarily insufficient in itself to create an
> accident. Only jointly are these causes sufficient to create an
> accident. Indeed, it is the linking of these causes together that
> creates the circumstances required for the accident. Thus, no
> isolation of the ‘root cause’ of an accident is possible. The
> evaluations based on such reasoning as ‘root cause’ do not reflect a
> technical understanding of the nature of failure but rather the
> social, cultural need to blame specific, localized forces or events
> for outcomes.

### 8. Hindsight biases post-accident assessments of human performance

> Knowledge of the outcome makes it seem that events leading to the
> outcome should have appeared more salient to practitioners at the time
> than was actually the case. This means that ex post facto accident
> analysis of human performance is inaccurate. The outcome knowledge
> poisons the ability of after-accident observers to recreate the view
> of practitioners before the accident of those same factors. It seems
> that practitioners “should have known” that the factors would
> “inevitably” lead to an accident. Hindsight bias remains the primary
> obstacle to accident investigation, especially when expert human
> performance is involved.

### 9. Человеческая роль двойственна: он и разработчик и защитник от ошибок

Human operators have dual roles: as producers & as defenders against failure

> The system practitioners operate the system in order to produce its
> desired product and also work to forestall accidents. This dynamic
> quality of system operation, the balancing of demands for production
> against the possibility of incipient failure is unavoidable. Outsiders
> rarely acknowledge the duality of this role. In non-accident filled
> times, the production role is emphasized. After accidents, the defense
> against failure role is emphasized. At either time, the outsider’s
> view misapprehends the operator’s constant, simultaneous engagement
> with both roles.

### 10. Все действия врачей — азартные игры

All practitioner actions are gambles

> After accidents, the overt failure often appears to have been
> inevitable and the practitioner’s actions as blunders or deliberate
> willful disregard of certain impending failure. But all practitioner
> actions are actually gambles, that is, acts that take place in the
> face of uncertain outcomes. The degree of uncertainty may change from
> moment to moment. That practitioner actions are gambles appears clear
> after accidents; in general, post hoc analysis regards these gambles
> as poor ones. But the converse: that successful outcomes are also the
> result of gambles; is not widely appreciated.

### 11. Действия — это нож, раскрывающий неопределенность

Actions at the sharp end resolve all ambiguity

> Organizations are ambiguous, often intentionally, about the
> relationship between production targets, efficient use of resources,
> economy and costs of operations, and acceptable risks of low and high
> consequence accidents. All ambiguity is resolved by actions of
> practitioners at the sharp end of the system. After an accident,
> practitioner actions may be regarded as ‘errors’ or ‘violations’ but
> these evaluations are heavily biased by hindsight and ignore the other
> driving forces, especially production pressure.

### 12. Врачи — адаптивный элемент комплексных систем

Human practitioners are the adaptable element of complex systems

> Practitioners and first line management actively adapt the system to
> maximize production and minimize accidents. These adaptations often
> occur on a moment by moment basis. Some of these adaptations include:
> (1) Restructuring the system in order to reduce exposure of vulnerable
> parts to failure. (2) Concentrating critical resources in areas of
> expected high demand. (3) Providing pathways for retreat or recovery
> from expected and unexpected faults. (4) Establishing means for early
> detection of changed system performance in order to allow graceful
> cutbacks in production or other means of increasing resiliency.

### 13. Экспертиза людей в сложной системе постоянно меняется

Human expertise in complex systems is constantly changing

> Complex systems require substantial human expertise in their operation
> and management. This expertise changes in character as technology
> changes but it also changes because of the need to replace experts who
> leave. In every case, training and refinement of skill and expertise
> is one part of the function of the system itself. At any moment,
> therefore, a given complex system will contain practitioners and
> trainees with varying degrees of expertise. Critical issues related to
> expertise arise from (1) the need to use scarce expertise as a
> resource for the most difficult or demanding production needs and (2)
> the need to develop expertise for future use.

### 14. Изменения приводят к новой форме ошибок

Change introduces new forms of failure

> The low rate of overt accidents in reliable systems may encourage
> changes, especially the use of new technology, to decrease the number
> of low consequence but high frequency failures. These changes maybe
> actually create opportunities for new, low frequency but high
> consequence failures. When new technologies are used to eliminate well
> understood system failures or to gain high precision performance they
> often introduce new pathways to large scale, catastrophic failures.
> Not uncommonly, these new, rare catastrophes have even greater impact
> than those eliminated by the new technology. These new forms of
> failure are difficult to see before the fact; attention is paid mostly
> to the putative beneficial characteristics of the changes. Because
> these new, high consequence accidents occur at a low rate, multiple
> system changes may occur before an accident, making it hard to see the
> contribution of technology to the failure.

### 15. Оценка «причин» ограничивает эффективность борьбы с ошибками в будущем

Views of ‘cause’ limit the effectiveness of defenses against future events

> Post-accident remedies for “human error” are usually predicated on
> obstructing activities that can “cause” accidents. These
> end-of-the-chain measures do little to reduce the likelihood of
> further accidents. In fact that likelihood of an identical accident is
> already extraordinarily low because the pattern of latent failures
> changes constantly. Instead of increasing safety, post-accident
> remedies usually increase the coupling and complexity of the system.
> This increases the potential number of latent failures and also makes
> the detection and blocking of accident trajectories more difficult.

### 16. Безопасность — это характеристика системы, а не отдельных ее компонентов

Safety is a characteristic of systems and not of their components

> Safety is an emergent property of systems; it does not reside in a
> person, device or department of an organization or system. Safety
> cannot be purchased or manufactured; it is not a feature that is
> separate from the other components of the system. This means that
> safety cannot be manipulated like a feedstock or raw material. The
> state of safety in any system is always dynamic; continuous systemic
> change insures that hazard and its management are constantly changing.

### 17. Люди постоянно создают безопасность

People continuously create safety

> Failure free operations are the result of activities of people who
> work to keep the system within the boundaries of tolerable
> performance. These activities are, for the most part, part of normal
> operations and superficially straightforward. But because system
> operations are never trouble free, human practitioner adaptations to
> changing conditions actually create safety from moment to moment.
> These adaptations often amount to just the selection of a
> well-rehearsed routine from a store of available responses; sometimes,
> however, the adaptations are novel combinations or de novo creations
> of new approaches.

### 18. Безошибочная деятельность требует экспертизы в ошибках

Failure free operations require experience with failure

> Recognizing hazard and successfully manipulating system operations to
> remain inside the tolerable performance boundaries requires intimate
> contact with failure. More robust system performance is likely to
> arise in systems where operators can discern the “edge of the
> envelope”. This is where system performance begins to deteriorate,
> becomes difficult to predict, or cannot be readily recovered. In
> intrinsically hazardous systems, operators are expected to encounter
> and appreciate hazards in ways that lead to overall performance that
> is desirable. Improved safety depends on providing operators with
> calibrated views of the hazards. It also depends on providing
> calibration about how their actions move system performance towards or
> away from the edge of the envelope.

Here is a video of Richard talking about how complex systems don’t
fail.


[1]: http://www.farnamstreetblog.com/2014/04/antifragile-a-definition/
[2]: http://www.ctlab.org/documents/How%20Complex%20Systems%20Fail.pdf
