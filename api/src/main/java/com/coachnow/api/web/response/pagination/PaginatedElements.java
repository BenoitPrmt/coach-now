package com.coachnow.api.web.response.pagination;

import java.util.List;

public class PaginatedElements<T> {
    public boolean isPaginationEnabled;
    public int page;
    public int pageSize;
    public int totalPages;
    public int totalElements;

    public List<T> elements;

    public PaginatedElements(boolean isPaginationEnabled, int page, int pageSize, int totalPages, int totalElements, List<T> elements) {
        this.isPaginationEnabled = isPaginationEnabled;
        this.page = page;
        this.pageSize = pageSize;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.elements = elements;
    }

    public boolean getIsPaginationEnabled() {
        return isPaginationEnabled;
    }

    public int getPage() {
        return page;
    }

    public int getPageSize() {
        return pageSize;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public int getTotalElements() {
        return totalElements;
    }

    public List<T> getElements() {
        return elements;
    }
}
