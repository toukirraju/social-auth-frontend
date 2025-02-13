'use client'
import {
    Anchor,
    Button,
    Checkbox,
    Divider,
    Group,
    Paper,
    PaperProps,
    PasswordInput,
    Stack,
    Text,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst, useToggle } from '@mantine/hooks';
import { GoogleButton } from './GoogleButton';
import { FacebookButton } from './FacebookButton';
import { useSignInMutation, useSignUpMutation } from '../features/authApiSlice';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { clearAuthCookies } from '@/lib';
export interface ErrorType {
    data?: {
        message?: string;
        response?: {
            message?: string;
        };
    };
}

export function AuthenticationForm(props: PaperProps) {
    const [type, toggle] = useToggle(['login', 'register']);
    const router = useRouter();
    const [signIn, { isLoading: signInLoading }] = useSignInMutation();
    const [signUp, { isLoading: signUpIsLoading }] = useSignUpMutation();


    const isLoading = signInLoading || signUpIsLoading;
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    const handleSubmit = async () => {

        if (type === 'login') {
            const { email, password } = form.values;
            const signInFormValues = { email, password };
            try {
                await signIn(signInFormValues)
                    .unwrap()
                    .then(async (data) => {
                        notifications.show({
                            title: 'Success',
                            message: "You've successfully signed in!",
                            color: 'green',
                            autoClose: 2000,
                        });
                        router.push(`/dashboard`);
                    });
            } catch (error) {
                const errorData = error as ErrorType;
                notifications.show({
                    title: 'Error',
                    message: errorData.data?.response?.message || errorData?.data?.message || 'An error occurred',
                    color: 'red',
                    autoClose: 2000,
                });
            }
        } else {
            // register
            const { email, password, name } = form.values;
            const registerFormValues = { email, password, name };

            try {
                await signUp(registerFormValues)
                    .unwrap()
                    .then(async (data) => {
                        notifications.show({
                            title: 'Success',
                            message: "You've successfully signed up!",
                            color: 'green',
                            autoClose: 2000,
                        });
                        router.push(`/dashboard`);
                    });
            } catch (error) {
                const errorData = error as ErrorType;
                notifications.show({
                    title: 'Error',
                    message: errorData.data?.response?.message || errorData?.data?.message || 'An error occurred',
                    color: 'red',
                    autoClose: 2000,
                });
            }

        }
    };

    return (
        <Paper radius="md" p="xl" withBorder {...props}>
            <Text size="lg" fw={500}>
                Welcome to CodeScar, {type} with
            </Text>

            <Group grow mb="md" mt="md" >
                <GoogleButton radius="xl">Google</GoogleButton>
                <FacebookButton radius="xl">Facebook</FacebookButton>
            </Group>

            <Divider label="Or continue with email" labelPosition="center" my="lg" />

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    {type === 'register' && (
                        <TextInput
                            label="Name"
                            placeholder="Your name"
                            value={form.values.name}
                            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                            radius="md"
                        />
                    )}

                    <TextInput
                        required
                        label="Email"
                        placeholder="hello@mantine.dev"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Password should include at least 6 characters'}
                        radius="md"
                    />

                    {type === 'register' && (
                        <Checkbox
                            label="I accept terms and conditions"
                            checked={form.values.terms}
                            onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                        />
                    )}
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                        {type === 'register'
                            ? 'Already have an account? Login'
                            : "Don't have an account? Register"}
                    </Anchor>
                    <Button loading={isLoading} type="submit" radius="xl">
                        {upperFirst(type)}
                    </Button>
                </Group>
            </form>
        </Paper>
    );
}