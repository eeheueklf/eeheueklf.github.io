/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import type {Props} from '@theme/Admonition/Type/Info';
import AdmonitionLayout from '@theme/Admonition/Layout';
import IconInfo from '@theme/Admonition/Icon/Info';

const infimaClassName = 'alert alert--info';


export default function AdmonitionTypeInfo(props: Props): JSX.Element {
  return (
    <AdmonitionLayout
      {...props}
      className={clsx(infimaClassName, props.className)}>
      {props.children}
    </AdmonitionLayout>
  );
}
