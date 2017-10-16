import escape from 'escape-regexp';

export function isUrlMatch(rule, url) {
    // removeQuery
    url = url.split('?')[0];

    rule = escape(rule);
    rule = rule.replace(/:[^\/]+/g, '\d+');
    rule = new RegExp(`^${rule}$`);

    return rule.test(url);
}
