﻿using System;
using AutoMapper;
using DataAccessProduct = KatlaSport.DataAccess.ProductCatalogue.CatalogueProduct;
using DataAccessProductCategory = KatlaSport.DataAccess.ProductCatalogue.ProductCategory;

namespace KatlaSport.Services.ProductManagement
{
    public sealed class ProductManagementMappingProfile : Profile
    {
        public ProductManagementMappingProfile()
        {
            CreateMap<DataAccessProductCategory, ProductCategory>();
            CreateMap<DataAccessProductCategory, ProductCategoryListItem>();
            CreateMap<DataAccessProduct, ProductCategoryProductListItem>();

            // TODO STEP 2 - Change the mapping below.
            CreateMap<DataAccessProduct, Product>();

            CreateMap<DataAccessProduct, ProductListItem>()
                .ForMember(li => li.CategoryCode, opt => opt.MapFrom(p => p.Category.Code));

            CreateMap<UpdateProductCategoryRequest, DataAccessProductCategory>()
                .ForMember(r => r.LastUpdated, opt => opt.MapFrom(p => DateTime.UtcNow));

            CreateMap<UpdateProductRequest, DataAccessProduct>()
                .ForMember(r => r.LastUpdated, opt => opt.MapFrom(p => DateTime.UtcNow));
        }
    }
}