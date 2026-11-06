import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Button } from '../components/Button';

const SampleLeftIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const SampleRightIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['ai-generated'],
  argTypes: {
    type: {
      control: 'select',
      options: ['solid', 'outline', 'destructive'],
      description: 'Figma component type variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'small', 'medium', 'large'],
      description: 'Figma size variant (sm=36px, md=44px, lg=52px)',
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    type: 'solid',
    size: 'md',
    disabled: false,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /button/i });
    await expect(button).toBeVisible();
    await expect(button).not.toBeDisabled();
  },
};

export const CssCheck: Story = {
  args: {
    children: 'CSS Check Button',
    type: 'solid',
    size: 'md',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /css check button/i });
    // Check computed height is 44px
    await expect(getComputedStyle(button).height).toBe('44px');
    // Check background color resolves to the tosca-500 (#009EA9 -> rgb(0, 158, 169))
    await expect(getComputedStyle(button).backgroundColor).toBe(
      'rgb(0, 158, 169)'
    );
  },
};

export const WithIcons: Story = {
  args: {
    children: 'Button with Icons',
    type: 'solid',
    size: 'md',
    leftIcon: <SampleLeftIcon />,
    rightIcon: <SampleRightIcon />,
  },
};

export const OutlineSecondary: Story = {
  args: {
    children: 'Secondary Outline',
    type: 'outline',
    size: 'md',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /secondary outline/i });
    // Outline in Figma has #FFFFFF background
    await expect(getComputedStyle(button).backgroundColor).toBe(
      'rgb(255, 255, 255)'
    );
  },
};

export const DestructiveDanger: Story = {
  args: {
    children: 'Delete Item',
    type: 'destructive',
    size: 'md',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /delete item/i });
    // Destructive has #EE3124 (rgb(238, 49, 36))
    await expect(getComputedStyle(button).backgroundColor).toBe(
      'rgb(238, 49, 36)'
    );
  },
};

export const Showroom = {
  render: () => {
    const types = ['solid', 'outline', 'destructive'] as const;
    const sizes = ['sm', 'md', 'lg'] as const;

    return (
      <div
        style={{
          padding: '24px',
          fontFamily: 'var(--font-family-ubuntu, sans-serif)',
          background: 'var(--background-color-secondary, #f9fafa)',
          minHeight: '100vh',
        }}
      >
        <h1 style={{ marginBottom: '8px' }}>
          Button Component — Figma Spec (node-id: 88746:15695)
        </h1>
        <p
          style={{
            color: 'var(--font-color-secondary, #686e76)',
            marginBottom: '32px',
          }}
        >
          Komponen Tombol Utama (Button) PaDi UMKM: 3 Types (Solid, Outline, Destructive) × 3 Sizes (sm, md, lg) × 5 States.
        </p>

        {types.map((type) => (
          <div
            key={type}
            style={{
              marginBottom: '36px',
              border: '1px solid var(--border-color-dark, #dee3ed)',
              borderRadius: '8px',
              padding: '24px',
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            }}
          >
            <h2
              style={{
                textTransform: 'capitalize',
                borderBottom: '2px solid var(--border-color-dark, #dee3ed)',
                paddingBottom: '8px',
                marginBottom: '20px',
              }}
            >
              Type: {type === 'solid' ? 'Solid (Primary CTA)' : type === 'outline' ? 'Outline (Secondary)' : 'Destructive (Danger)'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h4 style={{ color: '#686e76', marginBottom: '12px', fontSize: '13px' }}>
                  Standard Sizes
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  {sizes.map((size) => (
                    <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '11px', color: '#8c9197' }}>
                        size={size} ({size === 'sm' ? '36px' : size === 'md' ? '44px' : '52px'})
                      </span>
                      <Button type={type} size={size}>
                        {type} {size}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ color: '#686e76', marginBottom: '12px', fontSize: '13px' }}>
                  With Icons (Left / Right Slots)
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  {sizes.map((size) => (
                    <Button key={size} type={type} size={size} leftIcon={<SampleLeftIcon />} rightIcon={<SampleRightIcon />}>
                      Action {size}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ color: '#686e76', marginBottom: '12px', fontSize: '13px' }}>
                  States: Disabled & Loading
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <Button type={type} size="md" disabled>
                    Disabled
                  </Button>
                  <Button type={type} size="md" loading>
                    Loading...
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  },
};
