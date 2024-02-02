import { FC } from 'react';
import { Column, Input, InputProps, Typography } from 'ui';

type LabelledFieldProps = InputProps & {
	fullWidth?: boolean;
	label: string;
};

export const LabelledInput: FC<LabelledFieldProps> = ({ label, ...props }) => {
	return (
		<Column fullWidth={props.fullWidth}>
			<Typography fontColor="font3" variant="overline">
				{label}
			</Typography>
			<Input {...props} />
		</Column>
	);
};
