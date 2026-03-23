/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  PageMetadata,
  useCurrentSidebarCategory,
} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import type {Props} from '@theme/DocCategoryGeneratedIndexPage';

import styles from './styles.module.css';


function DocCategoryGeneratedIndexPageMetadata({
  categoryGeneratedIndex,
}: Props): JSX.Element {
  return (
    <PageMetadata
      title={categoryGeneratedIndex.title}
      description={categoryGeneratedIndex.description}
      keywords={categoryGeneratedIndex.keywords}
      image={useBaseUrl(categoryGeneratedIndex.image)}
    />
  );
}

function DocCategoryGeneratedIndexPageContent({
  categoryGeneratedIndex,
}: Props): JSX.Element {
  const category = useCurrentSidebarCategory();
  const homeHref = useBaseUrl('/');

  return (
    <div className={styles.generatedIndexPage}>
      <div>
        <header className="docsBanner">
          / <Link href={homeHref} className="docs__subtitle">홈</Link> 
          <Heading as="h1" className="hanna-text">
            {categoryGeneratedIndex.title}
          </Heading>
        </header>
      </div>

      <article>
        {category.items.map((item, index) => {
          if (item.type === 'category') {
            return (
              <section key={index}>
                <div className='menu__title'>
                  {item.label}
                </div>
                <ul className='menu__list'>
                  {item.items.map((child, childIdx) => (
                    <li key={childIdx} style={{ margin: 0 }}>
                      <Link to={child.href} className="menu__link">
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          }
          return null;
        })}
      </article>
    </div>
  );
}

export default function DocCategoryGeneratedIndexPage(
  props: Props,
): JSX.Element {
  return (
    <>
      <DocCategoryGeneratedIndexPageMetadata {...props} />
      <DocCategoryGeneratedIndexPageContent {...props} />
    </>
  );
}