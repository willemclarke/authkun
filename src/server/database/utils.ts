import { QueryResultRow, sql, TaggedTemplateLiteralInvocation } from 'slonik';

export const dateTimeAsTimestamp = (
  dateObj: Date | null
): TaggedTemplateLiteralInvocation<QueryResultRow> => {
  if (dateObj) {
    return sql`TO_TIMESTAMP(${dateObj.getTime()} / 1000.0)`;
  } else {
    return sql`null`;
  }
};
