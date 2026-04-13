/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import {useDocsSidebar} from '@docusaurus/theme-common/internal';
import type {Props} from '@theme/DocRoot/Layout/Main';

import styles from './styles.module.css';

export default function DocRootLayoutMain({
  hiddenSidebarContainer,
  children,
}: Props): JSX.Element {
  const sidebar = useDocsSidebar();
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <main>
        <div
          className={clsx(
            'container',
            styles.docItemWrapper,
            hiddenSidebarContainer && styles.docItemWrapperEnhanced,
          )}>
          {children}
        </div>
      </main>
    </div>
  );
}
