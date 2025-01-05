"use client"
import React, { useActionState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from 'next-intl';
import Text from '@/components/Text';
import { ActionResponse } from '@/type/types';
import { newPackageRequest } from '../actions/action';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Icon } from "@iconify/react";

const initialState: ActionResponse = {
    success: false,
    message: "",
};

function CTAbutton({ servicetype }: { servicetype: string }) {
    const isPopular = true
    const t = useTranslations("pricePage");
    const locale = useLocale();
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className={`w-full py-3 px-6 rounded-xl font-medium
                    transition-all duration-300
                    ${isPopular
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white"
                            : "bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white"
                        }
                    shadow-md hover:shadow-lg
                    border border-white/10`}
                >
                    <Text variant="span" className="text-white font-medium" locale={locale}>
                        {t("getStarted")}
                    </Text>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className='flex items-center justify-between w-full '>
                        <DialogTitle>{t("dialog.title")}</DialogTitle>
                        <div className='border mr-7 bg-green-800 text-green-400 border-green-500 px-2 rounded-xl capitalize font-medium text-sm py-1 '>{servicetype}</div>
                    </div>

                    <DialogDescription>{t("dialog.description")}</DialogDescription>
                </DialogHeader>
                <AddRequest t={t} servicetype={servicetype} />

            </DialogContent>
        </Dialog>
    )
}

export default CTAbutton

const AddRequest = ({ t, servicetype }: { t: (key: string) => string, servicetype: string }) => {
    const [state, action, isPending] = useActionState(newPackageRequest, initialState);
    return (
        <form action={action} className="w-full flex flex-col items-start gap-2" autoComplete="on">
            <Input
                id="name"
                name='name'
                placeholder={t("dialog.namePlaceholder")}
                required
            />
            <Input
                id="phone"
                name='phone'
                type="tel"
                placeholder={t("dialog.phonePlaceholder")}
                required
            />
            <Input
                id="serviceType"
                name="serviceType"
                type="hidden"
                value={servicetype} // Replace with dynamic value based on the selected plan
            />
            <Button type="submit" className="w-full" disabled={isPending}>

                {isPending ? "Submitting..." : t("dialog.submitButton")}
            </Button>
            <div>
                {state?.message && (
                    <Alert variant={state.success ? "default" : "destructive"}   >
                        {state.success && (
                            <Icon
                                icon="solar:check-circle-bold"
                                className="w-4 h-4 text-emerald-500"
                            />
                        )}
                        <AlertDescription>{state.message}</AlertDescription>
                    </Alert>
                )}
            </div>
        </form>)
}

