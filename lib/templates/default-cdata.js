import merge from "merge";

module.exports = function(h, modules, classes, slots) {
  var filterId = "VueTables__search_" + this.id;
  var ddpId = "VueTables__dropdown-pagination_" + this.id;
  var perpageId = "VueTables__limit_" + this.id;
  var perpageValues = require("../modules/per-page-values").call(this, h);
  var caption = this.opts.caption ? <caption>{this.opts.caption}</caption> : '';

  var genericFilter = this.hasGenericFilter ? (
    <div class="VueTables__search-field">
      <label for={filterId} class={classes.label}>
        {this.display("filter")}
      </label>
      {modules.normalFilter(classes, filterId)}
    </div>
  ) : (
    ""
  );

  var perpage = !this.opts.hidePerPageSelect && (perpageValues.length > 1 || this.opts.alwaysShowPerPageSelect) ? (
      <div class="VueTables__limit-field">
        <label class={classes.label} for={perpageId}>
          {this.display("limit")}
        </label>
        {modules.perPage(perpageValues, classes.select, perpageId)}
      </div>
    ) : (
      ""
    );

  var dropdownPagination =
    this.opts.pagination && this.opts.pagination.dropdown ? (
      <div class="VueTables__pagination-wrapper">
        <div
          class={`${classes.field} ${classes.inline} ${
            classes.right
          } VueTables__dropdown-pagination`}
          v-show={this.totalPages > 1}
        >
          <label for={ddpId}>{this.display("page")}</label>
          {modules.dropdownPagination(classes.select, ddpId)}
        </div>
      </div>
    ) : (
      ""
    );

  var columnsDropdown = this.opts.columnsDropdown ? (
    <div class="VueTables__columns-dropdown-wrapper">
      {modules.columnsDropdown(classes)}
    </div>
  ) : (
    ""
  );

  var footerHeadings = this.opts.footerHeadings ? (
    <tfoot>
      <tr>{modules.headings(classes.right)}</tr>
    </tfoot>
  ) : (
    ""
  );

  var shouldShowTop =
    genericFilter ||
    perpage ||
    dropdownPagination ||
    columnsDropdown ||
    slots.beforeFilter ||
    slots.afterFilter ||
    slots.beforeLimit ||
    slots.afterLimit;

  var tableTop = (
    <div class="VueTables__tableTop">
      <div
        class={`${classes.field} ${classes.inline} ${
          classes.left
        } VueTables__search`}
      >
        {slots.beforeFilter}
        {genericFilter}
        {slots.afterFilter}
      </div>
        {slots.afterFilterWrapper}
      {modules.pagination(
        merge(classes.pagination, {
          wrapper: ``,
          nav: classes.center,
          count: ``
        })
      )}
      {modules.dropdownPaginationCount()}
      <div
        class={`${classes.field} ${classes.inline} ${
          classes.right
        } VueTables__limit`}
      >
        {slots.beforeLimit}
        {perpage}
        {slots.afterLimit}
      </div>
      {dropdownPagination}
      {columnsDropdown}
    </div>
  );

  return (
    <div class={"VueTables VueTables--" + this.source}>
      {tableTop}
      {slots.beforeTable}
      <div class="table-responsive">
        <table
          class={`VueTables__table ${
            this.opts.skin ? this.opts.skin : classes.table
          }`}
          summary={this.opts.summary}
        >
              {caption}
          <thead>
            {slots.prependHead}
            <tr>{modules.headings(classes.right)}</tr>
            {slots.beforeFilters}
            {modules.columnFilters(classes)}
            {slots.afterFilters}
          </thead>
          {footerHeadings}
          {slots.beforeBody}
          <tbody>
            {slots.prependBody}
            {modules.rows(classes)}
            {slots.appendBody}
          </tbody>
          {slots.afterBody}
        </table>
      </div>
      {slots.afterTable}
    </div>
  );
};
