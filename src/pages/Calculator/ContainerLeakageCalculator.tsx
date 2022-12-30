import { FC, useEffect, useMemo, useRef, useState } from "react";
import NumberInput from "../../controls/Inputs/NumberInput";
import LabelWrapper from "../../controls/LabelWrapper";
import Button from "../../controls/Layout/Button";
import Header from "../../controls/Layout/Header";
import { useUpdateValue } from "../../hooks/useUpdateValue";
import { containerLeakageCalculator } from "../../utils/clipCalc";
import { hasRequiredValues } from "../../utils/helper";

type ContainerLeakageValues = {
	volume: number | undefined;
	onPressure: number | undefined;
	offPressure: number | undefined;
	measureTime: number | undefined;
};

const defaultContainerLeakageValues: ContainerLeakageValues = {
	volume: undefined,
	onPressure: undefined,
	offPressure: undefined,
	measureTime: undefined,
};

const ContainerLeakageCalculator: FC = () => {
	const [isMeasuring, setIsMeasuring] = useState<boolean>(false);
	const intervalRef = useRef<NodeJS.Timer>();
	const [containerLeakageValues, setContainerLeakageValues] = useState<ContainerLeakageValues>(
		defaultContainerLeakageValues,
	);
	const [getContainerLeakageValues, updateContainerLeakageValues] = useUpdateValue(
		containerLeakageValues,
		setContainerLeakageValues,
	);
	const resetValues = () => setContainerLeakageValues(defaultContainerLeakageValues);

	const result = useMemo(() => {
		const { volume = 0, onPressure = 0, offPressure = 0, measureTime = 0 } = containerLeakageValues;
        if (!hasRequiredValues(containerLeakageValues)) return;
		return containerLeakageCalculator(volume, onPressure, offPressure, measureTime);
	}, [containerLeakageValues]);

	const startTimer = () => {
		setIsMeasuring(true);
		const startTime = new Date();
		//starts an interval that refreshes the measureTime every 50 milliseconds
		intervalRef.current = setInterval(() => {
			if (!startTime) return;
			const currentTime = new Date();
			const time = currentTime.getTime() - startTime.getTime();
			updateContainerLeakageValues("measureTime")(Math.round(time / 1000));
		}, 50);
	};

	const stopTimer = () => {
		setIsMeasuring(false);
		clearInterval(intervalRef.current);
	};

	//clear intervalRef when component is unmounted
	useEffect(() => {
		return () => clearInterval(intervalRef.current);
	}, []);

	return (
		<div className={"flex flex-col"}>
			<Header title={"Behälter Leckage"} />
			<div className={"flex flex-col m-2 gap-2"}>
				<LabelWrapper label="Behältervolumen [l]:">
					<NumberInput
						number={getContainerLeakageValues("volume")}
						onNumberChange={updateContainerLeakageValues("volume")}
					/>
				</LabelWrapper>
				<LabelWrapper label="Druckbehälteranfangsdruck [barÜ]:">
					<NumberInput
						number={getContainerLeakageValues("onPressure")}
						onNumberChange={updateContainerLeakageValues("onPressure")}
					/>
				</LabelWrapper>
				<LabelWrapper label="Druckbehälterenddruck [barÜ]:">
					<NumberInput
						number={getContainerLeakageValues("offPressure")}
						onNumberChange={updateContainerLeakageValues("offPressure")}
					/>
				</LabelWrapper>
				<LabelWrapper label="Messzeit [s]:">
					<div className="flex gap-2 items-center w-full">
						<NumberInput
							className="grow"
							number={getContainerLeakageValues("measureTime")}
							onNumberChange={updateContainerLeakageValues("measureTime")}
						/>
						<Button onClick={isMeasuring ? stopTimer : startTimer}>
							{isMeasuring ? "Stop" : "Start"}
						</Button>
					</div>
				</LabelWrapper>
				<LabelWrapper label="Leckagemenge [m3/min]:">
					<NumberInput number={result} disabled={true} />
				</LabelWrapper>
			</div>
			<div className={"flex"}>
				<Button onClick={resetValues}>Zurücksetzen</Button>
			</div>
		</div>
	);
};

export default ContainerLeakageCalculator;
