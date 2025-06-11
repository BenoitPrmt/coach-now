import type {Level} from "~/types";
import {memo, useMemo} from "react";
import {isOfTypeLevel} from "~/validation/typesValidations";
import {translateIntoFrench} from "~/lib/translations";
import {Badge} from "~/components/ui/badge";
import {SPORTS} from "~/constants";
import {cn} from "~/lib/utils";
import {GraduationCap} from "lucide-react";

const LevelBadge = ({level, className}: { level: Level; className?: string }) => {
    const variant = useMemo(() => {
        switch (level) {
            case 'BEGINNER':
                return 'light';
            case 'MEDIUM':
                return 'light-secondary';
            case 'HIGHLEVEL':
                return 'light-success';
            default:
                return 'light';
        }
    }, [level]);
    return (
        <Badge variant={variant} className={className}>
            <GraduationCap/>
            {translateIntoFrench(level)}
        </Badge>
    )
}

const CoachBadge = memo(({value, className}: { value: Level | string; className?: string }) => {
    const isValidLevel = useMemo(() => {
        return isOfTypeLevel(value);
    }, [value]);

    if (isValidLevel) {
        return <LevelBadge className={className} level={value as Level}/>;
    } else {
        const correspondingSport = SPORTS.SPORTS.find((sport) => sport.key.includes(value as string));
        return (
            <Badge className={cn(correspondingSport?.badgeClass, className)} variant="light">
                {correspondingSport?.icon && <correspondingSport.icon className={correspondingSport.iconClass}/>}
                {correspondingSport?.name}
            </Badge>
        )
    }
});

export default CoachBadge;
