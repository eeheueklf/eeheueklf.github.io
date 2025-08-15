/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import type {Props} from '@theme/Admonition/Type/Warning';
import AdmonitionLayout from '@theme/Admonition/Layout';
import IconWarning from '@theme/Admonition/Icon/Warning';

const infimaClassName = 'alert alert--warning';

const defaultProps = {
  icon: '🌞',
};

export default function AdmonitionTypeWarning(props: Props): JSX.Element {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={clsx(infimaClassName, props.className)}>
      {props.children}
    </AdmonitionLayout>
  );
}
