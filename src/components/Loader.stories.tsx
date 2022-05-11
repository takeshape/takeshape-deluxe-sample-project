import type { ComponentMeta } from '@storybook/react';
import { Loader } from './Loader';

export default {
  title: 'Components/Loader',
  component: Loader,
  decorators: [(Story) => <div className="relative z-10">{Story()}</div>]
} as ComponentMeta<typeof Loader>;

const Template = (args) => <Loader {...args} />;

export const Renders = Template.bind({});
