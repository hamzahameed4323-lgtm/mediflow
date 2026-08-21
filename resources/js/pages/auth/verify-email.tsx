// Components
import { Form, Head, usePoll } from '@inertiajs/react';
import { Mail, MailCheck } from 'lucide-react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
    usePoll(2000);

    return (
        <>
            <Head title="Verify email" />

            <div className="flex flex-col items-center gap-4">
                {/* Email Verification Icon Badge */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-sm">
                    {status === 'verification-link-sent' ? (
                        <MailCheck className="h-6 w-6" />
                    ) : (
                        <Mail className="h-6 w-6" />
                    )}
                </div>

                {status === 'verification-link-sent' && (
                    <div className="w-full rounded-xl border border-primary/20 bg-primary/10 p-3 text-center text-xs sm:text-sm font-medium text-primary shadow-xs">
                        A new verification link has been sent to your email address.
                    </div>
                )}

                <Form action={send.url()} method="post" className="w-full space-y-4 text-center">
                    {({ processing }) => (
                        <>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="h-10 w-full text-xs sm:text-sm font-semibold"
                                data-test="resend-verification-button"
                            >
                                {processing ? (
                                    <Spinner />
                                ) : (
                                    <Mail className="h-4 w-4" />
                                )}
                                Resend verification email
                            </Button>

                            <div className="pt-1">
                                <TextLink
                                    href={logout()}
                                    as="button"
                                    className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Log out
                                </TextLink>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

VerifyEmail.layout = {
    title: 'Verify your email',
    description:
        'Please verify your email address by clicking the link we just sent you.',
};

