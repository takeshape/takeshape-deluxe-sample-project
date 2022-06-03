import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { reviews } from '../ProductPage.fixtures';
import Reviews from './Reviews';

const Meta: ComponentMeta<typeof Reviews> = {
  title: 'Features / Product Page / Components / Reviews',
  component: Reviews,
  parameters: {
    layout: 'centered'
  }
};

const Template: ComponentStory<typeof Reviews> = (args) => <Reviews {...args} />;

export const _Reviews = Template.bind({});
_Reviews.args = {
  reviews
};

export default Meta;
