(function (Prism) {

	Prism.languages.archetype = {
		'comment': /\(\*[\s\S]*?\*\)/,
		'string': [
			{
				pattern: /"(?:\\.|[^\\\r\n"])*"/,
				greedy: true
			},
			{
				pattern: /(['`])(?:\\(?:\d+|x[\da-f]+|.)|(?!\1)[^\\\r\n])\1/i,
				greedy: true
			}
		],
		'number': /\b(?:0x[\da-f][\da-f_]+|(?:0[bo])?\d[\d_]*\.?[\d_]*(?:e[+-]?[\d_]+)?)/i,
		'label': {
			pattern: /\B~\w+/,
			alias: 'function'
		},
		'type_variable': {
			pattern: /\w+\s+:\s+\w+/,
			alias: 'function'
		},
		// For the list of keywords and operators,
		// see: http://caml.inria.fr/pub/docs/manual-ocaml/lex.html#sec84
		'declaration': /\b(?:constant|archetype|enum|states|variable|asset|entry|transition|function|getter|var|let some|specification|postcondition|record|invariant)\b/,
		'keyword': /\b(?:as|require|failif|called|by|effect|initial|identified by|initialized by|assert|begin|end|do|done|else|otherwise|return|before|for|if|in|match|in|forall|added|removed|exists|struct|then|from|to|while|with|when|fails|operations|InvalidCondition|InvalidCaller|NotFound|NatAssign|SliceError)\b/,
		'boolean': /\b(?:false|true)\b/,
		// Custom operators are allowed
		'operator': /:=|\+=|\-=|[=<>@^|&+\-*\/$%!?~][!$%&*+\-.\/:<=>?@^|~]*|\b(?:and|not|asr|land|lor|lsl|lsr|lxor|mod|or|update|addupdate|dofailif|dorequire|sum|fail|some|isempty|length|now|transferred|caller|selfaddress|the|transfer|state|min|max)\b/,
		'punctuation': /[(){}\[\]|.,:;]|\b_\b/
	};
}(Prism));
