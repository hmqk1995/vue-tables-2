module.exports = function(query) {

  var el;

  if (this.opts.filterByColumn) {

    for (var column in query) {

      var columnName = this._getColumnName(column);

      if (this.isDateFilter(column)) {
        if (query[column] && typeof query[column]==='object') {
          var start = typeof query[column].start==='string'?moment(query[column].start,'YYYY-MM-DD'):query[column].start;
          var end = typeof query[column].end==='string'?moment(query[column].end,'YYYY-MM-DD'):query[column].end;

          this._setDatepickerText(column,start, end);
        } else {
          $(this.$el).find("#VueTables__" + $.escapeSelector(column) + "-filter").html("<span class='VueTables__filter-placeholder'>" + this.display('filterBy',{column:this.getHeading(column)}) + "</span>");
        }
        continue;
      }

        el = this.$el.querySelector(`[name='${columnName}']`);

        if (el) {
          el.value = query[column];
        } else if (this.columns.indexOf(column)===-1) {
          console.error(`vue-tables-2: Error in setting filter value. Column '${column}' does not exist.`);
        }
    }
  } else {
    this.$el.querySelector('.VueTables__search__input').value = query;
  }

}

