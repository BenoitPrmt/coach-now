import {useEffect, useState, useCallback, useMemo} from 'react';
import CoachCard from "app/components/Coach/CoachCard";
import {motion, type Variants} from "motion/react";
import {getPublicEnv} from "../../env.common";
import type {Coach, PaginatedResponse} from "~/types";
import {useUser} from "~/hooks/useUser";
import Loader from "~/components/Loader";
import PaginationComponent from "~/components/Pagination";
import {Input} from "~/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";
import {Button} from "~/components/ui/button";
import pkg from 'lodash';
import {search as searchOptions} from "~/constants";
import {cn} from "~/lib/utils";
import {useSearchParams} from "react-router";

const {debounce} = pkg;

const {SPORTS_OPTIONS, FILTER_OPTIONS, SORT_OPTIONS, LEVELS_OPTIONS, GENDER_OPTIONS} = searchOptions;

const titleTransition: Variants = {
    hidden: {
        opacity: 0,
        y: -20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
}

const gridTransition: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            staggerChildren: 0.15,
            ease: "easeOut",
        },
    },
}

const gridElementTransition: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        y: 20,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut",
        },
    },
}

const CoachesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [coaches, setCoaches] = useState<Coach[] | undefined>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState(searchParams.get('search') || "");
    const [filter, setFilter] = useState(searchParams.get('filter') || "");
    const [filterBy, setFilterBy] = useState(searchParams.get('filterBy') || "");
    const [sortBy, setSortBy] = useState(searchParams.get('sort') || "id");
    const [page, setPage] = useState(parseInt(searchParams.get('page') || "1", 10));
    const [pageSize, setPageSize] = useState(parseInt(searchParams.get('pageSize') || "10", 10));
    const [totalPages, setTotalPages] = useState<number>(0);
    const {userToken} = useUser();

    const debouncedFetchCoaches = useMemo(
        () => debounce(async (searchTerm: string, filterValue: string, filterByValue: string, sortValue: string, currentPage: number, currentPageSize: number) => {
            try {
                setIsLoading(true);

                const params = new URLSearchParams();
                params.append('page', (currentPage - 1).toString());
                params.append('pageSize', currentPageSize.toString());
                params.append('sort', sortValue);

                if (searchTerm && searchTerm.trim() !== '') {
                    params.append('search', searchTerm.trim());
                }

                if (filterValue && filterValue.trim() !== '' && filterByValue && filterByValue.trim() !== '') {
                    params.append('filter', filterValue.trim());
                    params.append('filterBy', filterByValue.trim());
                }

                const response = await fetch(`${getPublicEnv(import.meta.env).VITE_API_URL}/coachs?${params.toString()}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${userToken}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch coaches');
                }

                const data: PaginatedResponse<Coach> = await response.json();
                setCoaches(data.elements);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error fetching coaches:', error);
                setCoaches([]);
            } finally {
                setIsLoading(false);
            }
        }, 500),
        [userToken, debounce]
    );

    useEffect(() => {
        if (userToken) {
            debouncedFetchCoaches(search, filter, filterBy, sortBy, page, pageSize);
        }
    }, [search, filter, filterBy, sortBy, page, pageSize, userToken, debouncedFetchCoaches]);

    useEffect(() => {
        return () => {
            debouncedFetchCoaches.cancel();
        };
    }, [debouncedFetchCoaches]);

    // Update URL params when state changes
    useEffect(() => {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (filter) params.set('filter', filter);
        if (filterBy) params.set('filterBy', filterBy);
        if (sortBy) params.set('sort', sortBy);
        if (page > 1) params.set('page', page.toString());
        if (pageSize !== 10) params.set('pageSize', pageSize.toString());

        setSearchParams(params, {replace: true});
    }, [search, filter, filterBy, sortBy, page, pageSize, setSearchParams]);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
    }, [setSearch, setPage]);

    const handleFilterChange = useCallback((value: string) => {
        setFilter(value === 'all' ? '' : value);
        setPage(1);
    }, [setFilter, setPage]);

    const handleFilterByChange = useCallback((value: string) => {
        setFilterBy(value === 'none' ? '' : value);
        if (filter) {
            setFilter("");
        }
        setPage(1);
    }, [setFilter, filter, setPage]);

    const handleSortChange = useCallback((value: string) => {
        setSortBy(value);
        setPage(1);
    }, [setSortBy, setPage]);

    const clearFilters = useCallback(() => {
        setSearch("");
        setFilter("");
        setFilterBy("");
        setSortBy("id");
        setPage(1);
        setPageSize(10);
    }, [setSearch, setFilter, setSortBy, setPage]);

    const getFilterOptions = useCallback(() => {
        switch (filterBy) {
            case 'sports':
                return SPORTS_OPTIONS;
            case 'levels':
                return LEVELS_OPTIONS;
            case 'gender':
                return GENDER_OPTIONS;
            default:
                return [];
        }
    }, [filterBy, SPORTS_OPTIONS, LEVELS_OPTIONS, GENDER_OPTIONS]);

    const showFilterValueSelect = ['sports', 'levels', 'gender'].includes(filterBy);
    const showFilterInput = filterBy && !showFilterValueSelect;

    return (
        <div>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={titleTransition}
                className="text-center mb-12 max-w-7xl mx-auto"
            >
                <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                    Nos Coachs
                </h1>
                <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                    Découvrez nos coachs professionnels prêts à vous accompagner dans votre parcours sportif.
                </p>

                {/* Search and Filters */}
                <div className="mt-8 space-y-4">
                    {/* Search */}
                    <Input
                        type="text"
                        placeholder="Rechercher un coach..."
                        className="w-full"
                        value={search}
                        onChange={handleSearchChange}
                    />

                    {/* Filters and Sort */}
                    <div className="grid grid-cols-12 gap-4">
                        {/* Filter By */}
                        <Select value={filterBy} onValueChange={handleFilterByChange}>
                            <SelectTrigger
                                className={cn("w-full", (showFilterValueSelect || showFilterInput) ? "col-span-6 md:col-span-4" : "col-span-6")}>
                                <SelectValue placeholder="Filtrer par..."/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">Aucun filtre</SelectItem>
                                {FILTER_OPTIONS.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Filter Value - Select for enums */}
                        {showFilterValueSelect && (
                            <Select value={filter} onValueChange={handleFilterChange}>
                                <SelectTrigger className={cn("col-span-6 md:col-span-4 w-full")}>
                                    <SelectValue placeholder="Valeur du filtre..."/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Toutes les valeurs</SelectItem>
                                    {getFilterOptions().map(option => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}

                        {/* Filter Value - Input for text/number */}
                        {showFilterInput && (
                            <Input
                                type={filterBy === 'hourlyrate' ? 'number' : 'text'}
                                className={cn("col-span-6 md:col-span-4 w-full")}
                                placeholder={`Valeur pour ${FILTER_OPTIONS.find(opt => opt.value === filterBy)?.label || filterBy}...`}
                                value={filter}
                                onChange={(e) => handleFilterChange(e.target.value)}
                            />
                        )}

                        {/* Sort */}
                        <Select value={sortBy} onValueChange={handleSortChange}>
                            <SelectTrigger
                                className={cn("w-full", (showFilterValueSelect || showFilterInput) ? "col-span-12 md:col-span-4" : "col-span-6")}>
                                <SelectValue placeholder="Trier par..."/>
                            </SelectTrigger>
                            <SelectContent>
                                {SORT_OPTIONS.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Clear Filters */}
                        <Button variant="outline" onClick={clearFilters} className="col-span-12 md:col-span-3">
                            Effacer les filtres
                        </Button>
                    </div>
                </div>
            </motion.div>

            {isLoading && <Loader/>}

            {!isLoading && coaches && coaches.length === 0 && (
                <div className="text-center text-gray-500">
                    {search || filter ? 'Aucun coach trouvé pour cette recherche.' : 'Aucun coach disponible pour le moment.'}
                </div>
            )}

            {!isLoading && coaches && coaches.length > 0 && (
                <div className="flex flex-col">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="hidden"
                        animate="visible"
                        variants={gridTransition}
                    >
                        {coaches.map((coach) => (
                            <motion.div
                                key={coach.id}
                                variants={gridElementTransition}
                                className="flex"
                            >
                                <CoachCard coach={coach}/>
                            </motion.div>
                        ))}
                    </motion.div>

                    <PaginationComponent
                        className="mt-8"
                        currentPage={page}
                        setCurrentPage={setPage}
                        totalPages={totalPages}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                    />
                </div>
            )}
        </div>
    );
};

export default CoachesPage;
