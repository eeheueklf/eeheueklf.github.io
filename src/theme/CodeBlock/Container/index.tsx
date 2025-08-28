/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ComponentProps} from 'react';
import clsx from 'clsx';
import {ThemeClassNames, usePrismTheme} from '@docusaurus/theme-common';
import {getPrismCssVariables} from '@docusaurus/theme-common/internal';
import styles from './styles.module.css';

export default function CodeBlockContainer<T extends 'div' | 'pre'>({
  as: As,
  ...props
}: {as: T} & ComponentProps<T>): JSX.Element {
  const prismTheme = usePrismTheme();
  const prismCssVariables = getPrismCssVariables(prismTheme);
  return (
    <div className={styles.codeBlockContainer}>
      <div className={styles.codeHeader}>
        <div className={clsx(styles.circle, styles.red)}></div>
        <div className={clsx(styles.circle, styles.yellow)}></div>
        <div className={clsx(styles.circle, styles.green)}></div>
      </div>
      <As
        // Polymorphic components are hard to type, without `oneOf` generics
        {...(props as any)}
        style={prismCssVariables}
        className={clsx(
          props.className,
          styles.codeBlockLine,
          ThemeClassNames.common.codeBlock,
        )}
      />
    </div>
  );
}
