﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using PDSACW.Application.Common.Models;

namespace PDSACW.Application.Common.Mappings
{
    public static class MappingExtensions
    {
        public static Task<PaginatedList<TDestination>> PaginatedListAsync<TDestination>(this IQueryable<TDestination> queryable, int pageNumber, int pageSize)
            => PaginatedList<TDestination>.CreateAsync(queryable, pageNumber, pageSize);

        public static Task<List<TDestination>> ProjectToListAsync<TDestination>(this IQueryable queryable, IConfigurationProvider configuration)
            => queryable.ProjectTo<TDestination>(configuration).ToListAsync();
    }
}
