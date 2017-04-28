/**
 *
 */
class RangeFiller
{
    constructor(element, disableClass, enableClass) {
        this.element      = element;
        this.divs         = [];
        this.disableClass = disableClass;
        this.enableClass  = enableClass;
    }

    transform() {
        if (typeof this.element.attr('value') === "undefined") {
            this.element.val(0);
        }
        this.element.hide();
        let max = this.element.attr('max');
        for (let i = 0; i < max; i++) {
            let div = $('<div/>');
            div.attr('class', (parseInt(this.element.val()) <= i) ? this.disableClass : this.enableClass);
            div.attr('data-count', i + 1);
            div.mouseover(this.onHover.bind(this));
            div.mouseout(this.onOut.bind(this));
            div.click(this.click.bind(this));
            this.element.parent().append(div);
            this.divs.push(div);
        }
    }

    onHover(event) {
        $(event.target).attr('class', this.enableClass);
        var selected = $(event.target).attr('data-count');
        for (var i in this.divs) {
            var div = this.divs[i];
            if (parseInt(i) < parseInt(selected)) {
                $(div).attr('class', this.enableClass);
            } else {
                $(div).attr('class', this.disableClass);
            }
        }
    }

    click(event) {
        if (this.element.val() === $(event.target).attr('data-count')) {
            this.element.val(0);
            for (var i in this.divs) {
                let div = this.divs[i];
                $(div).attr('class', this.disableClass);
            }

        } else {
            this.element.val($(event.target).attr('data-count'));
        }
    }

    onOut() {
        var value = this.element.val();
        for (var i in this.divs) {
            var div = this.divs[i];
            if (parseInt(i) < parseInt(value)) {
                $(div).attr('class', this.enableClass);
            } else {
                $(div).attr('class', this.disableClass);
            }
        }
    }
}
