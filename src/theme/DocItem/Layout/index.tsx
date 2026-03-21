/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import DocItemFooter from '@theme/DocItem/Footer';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import type {Props} from '@theme/DocItem/Layout';

/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */

export default function DocItemLayout({children}: Props): JSX.Element {
  return (
    <div>
      <article>
        <DocBreadcrumbs />
        <DocItemContent>{children}</DocItemContent>
        <DocItemFooter />
      </article>
    </div>
  );
}
