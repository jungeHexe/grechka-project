import {data} from "./data";
import {BreadcrumbItem} from "../components/Breadcrumbs";

export interface Category {
  id?: string;
  name: string;
  tag?: string;
  children: any[];
}

export interface SearchByCategoryResult {
  breadcrumbs: BreadcrumbItem[];
  items: any[];
}

export function GetDataByCategory({categoryId, subcategoryId}: {categoryId?: string, subcategoryId?: string}) {
  let filteredData: Category = {name: 'Текстиль услуги', children: normalizeData(data.list)};
  let category;
  if (categoryId) {
    category = filteredData.children.find(el => el.id == categoryId);
    filteredData = category as Category;
  }
  if (subcategoryId) {
    const subcategory = category.children.find((cat: any) => cat.id == subcategoryId);
    filteredData = subcategory as Category;
  }

  if (!categoryId || !subcategoryId) {
    filteredData.children.forEach(el => {
      el.minPrice = findMinPrice(el);
    });
  }

  return Promise.resolve(filteredData);
}

export function GetFilteredDataWithBreadcrumb({searchTerm}: {searchTerm: string}) {
  const defaultData = data.list;
  const filteredData: SearchByCategoryResult[] = [];
  defaultData.forEach(cat => {
    if (cat.subcategory?.length) {
      cat.subcategory.forEach(subcat => {
        const elements = subcat.services.filter(el => el.name.toLowerCase().includes(searchTerm.toLowerCase()));
        if (elements.length > 0) {
          filteredData.push({
            breadcrumbs: [{name: 'Главная', path: '/'}, {name: cat.name, path: `/cat/${cat.id}`}, {name: subcat.name, path: `/cat/${cat.id}/subcat/${subcat.id}`}],
            items: elements,
          })
        }
      })
    } else if (cat.services?.length) {
      const elements = cat.services.filter(el => el.name.toLowerCase().includes(searchTerm.toLowerCase()));
      if (elements.length > 0) {
        filteredData.push({
          breadcrumbs: [{name: 'Главная', path: '/'}, {name: cat.name, path: `/cat/${cat.id}`}],
          items: elements,
        })
      }
    }
  });

  return Promise.resolve(filteredData);
}

function normalizeData(data: any[]): Category[] {
  data.forEach(el => {
    if (el.subcategory) {
      el.children = el.subcategory;
      return normalizeData(el.children);
    } else if (el.services) {
      el.children = el.services;
    } else {
      el.children = [];
      return;
    }
  })
  return data;
}

function findMinPrice(data: Category): any {
  if (data.tag === 'serv') {
    return;
  }
  const minPrice = Math.min(...data.children?.map(el => +el.price)?.filter(v => v != undefined));
  return !isNaN(minPrice) ? minPrice : Math.min(...data.children?.map(el => findMinPrice(el)));
}