import withDialog from '@/patterns/hoc/withDialog';
import { DialogContentProps } from '@/types/props/dialog.type';
import React from 'react';
import { css } from '@emotion/react';

export type SeeNoteFormData = {
  note: string
}

const SeeNoteForm: React.FC<DialogContentProps<SeeNoteFormData, any>> = ({ data }) => {
    return (
        <div css={styles}>{data.note}</div>
    )
}

export default withDialog(SeeNoteForm);

const styles = css`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  font-family: Inter;
  margin-bottom: 20px;
`;