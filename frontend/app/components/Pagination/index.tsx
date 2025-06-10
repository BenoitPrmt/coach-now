import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react"

import {usePagination} from "~/hooks/use-pagination"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from "~/components/ui/pagination"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"
import {cn} from "~/lib/utils";

type PaginationProps = {
    currentPage: number
    totalPages: number
    paginationItemsToDisplay?: number
    setCurrentPage?: (page: number) => void
    pageSize?: number
    setPageSize?: (pageSize: number) => void,
    className?: string
}

export default function PaginationComponent({
                                                currentPage,
                                                totalPages,
                                                paginationItemsToDisplay = 10,
                                                setCurrentPage,
                                                pageSize,
                                                setPageSize,
                                                className,
                                            }: PaginationProps) {
    const {pages, showLeftEllipsis, showRightEllipsis} = usePagination({
        currentPage,
        totalPages,
        paginationItemsToDisplay,
    })

    return (
        <div className={cn("flex items-center justify-between gap-3", className)}>
            {/* Page number information */}
            <p
                className="text-muted-foreground flex-1 text-sm whitespace-nowrap"
                aria-live="polite"
            >
                Page <span className="text-foreground">{currentPage}</span> of{" "}
                <span className="text-foreground">{totalPages}</span>
            </p>

            {/* Pagination */}
            <div className="grow">
                <Pagination>
                    <PaginationContent>
                        {/* Previous page button */}
                        <PaginationItem>
                            <PaginationLink
                                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                                href={
                                    currentPage === 1 ? undefined : `#/page/${currentPage - 1}`
                                }
                                aria-label="Page précédente"
                                aria-disabled={currentPage === 1 ? true : undefined}
                                role={currentPage === 1 ? "link" : undefined}
                            >
                                <ChevronLeftIcon size={16} aria-hidden="true"/>
                            </PaginationLink>
                        </PaginationItem>

                        {/* Left ellipsis (...) */}
                        {showLeftEllipsis && (
                            <PaginationItem>
                                <PaginationEllipsis/>
                            </PaginationItem>
                        )}

                        {/* Page number links */}
                        {pages.map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    onClick={setCurrentPage ? () => setCurrentPage(page) : undefined}
                                    href={setCurrentPage ? undefined : `#/page/${page}`}
                                    isActive={page === currentPage}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {/* Right ellipsis (...) */}
                        {showRightEllipsis && (
                            <PaginationItem>
                                <PaginationEllipsis/>
                            </PaginationItem>
                        )}

                        {/* Next page button */}
                        <PaginationItem>
                            <PaginationLink
                                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                                onClick={setCurrentPage ? () => setCurrentPage(currentPage + 1) : undefined}
                                href={setCurrentPage ? undefined : `#/page/${currentPage + 1}`}
                                aria-label="Page suivante"
                                aria-disabled={currentPage === totalPages ? true : undefined}
                                role={currentPage === totalPages ? "link" : undefined}
                            >
                                <ChevronRightIcon size={16} aria-hidden="true"/>
                            </PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

            {/* Résultats par page */}
            <div className="flex flex-1 justify-end">
                <Select defaultValue={String(pageSize) || "10"} aria-label="Résultats par page"
                        onValueChange={(value) => {
                            const newPageSize = parseInt(value, 10);
                            if (setPageSize) {
                                setPageSize(newPageSize);
                            }
                            // Reset to first page when changing page size
                            if (setCurrentPage) {
                                setCurrentPage(1);
                            }
                        }}
                >
                    <SelectTrigger
                        id="results-per-page"
                        className="w-fit whitespace-nowrap"
                    >
                        <SelectValue placeholder="Nombre de résultats"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10 / page</SelectItem>
                        <SelectItem value="20">20 / page</SelectItem>
                        <SelectItem value="50">50 / page</SelectItem>
                        <SelectItem value="100">100 / page</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
