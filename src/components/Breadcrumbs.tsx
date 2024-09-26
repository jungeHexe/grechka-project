import {Link} from 'react-router-dom';
import React, {} from 'react';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export default function Breadcrumbs({breadcrumbs}: {breadcrumbs: BreadcrumbItem[]}) {
  return (
    <nav>
      {breadcrumbs?.map((crumb: BreadcrumbItem, index: number) => (
        <span key={index}>
          <Link to={crumb.path}>{crumb.name}</Link>
          {index < breadcrumbs.length - 1 && ' > '}
        </span>
      ))}
    </nav>
  );
}