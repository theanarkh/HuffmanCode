function cal(str) {
	if (typeof str !== 'string' || str.length < 1) {
		return;
	}
	var map = {};
	var i = 0;
	while(str[i]) {
		map[str[i]] ? map[str[i]]++ : (map[str[i]] = 1);
		i++;
	}
	return map;
}

function sort(map) {
	map = map || {};
	var result = [];
	for (key in map) {
		if(map.hasOwnProperty(key)) {
			var obj = {
				key: key,
				val: map[key]
			};

			result.push(new Node(null, null, obj));
		}
	}
	return result.sort(function(x,y){return x.data.val > y.data.val});
}
function Node(left, right, data) {
	this.left = left;
	this.right = right;
	this.data = data;
}
function makeTree(table) {
	var i = 0;
	var len = table.length;
	var node1;
	var node2;
	var parentNode;
	while(table.length > 1) {
		parentNode = new Node(table[i], table[i+1], {key: null, val: table[i]['data'].val + table[i+1]['data'].val});
		table.splice(i,2);
		table.unshift(parentNode);
		table.sort(function(x,y){return x.data.val > y.data.val});
	}
	return table;
}
function encode(str, ret) {
	if (typeof str !== 'string' || str.length < 1) {
		return;
	}
	var i = 0;
	var result = '';
	while(str[i]) {
		result += ret[str[i++]];
	}
	return result
}
function reverseRet(ret) {
	var result = {};
	for (key in ret) {
		if(ret.hasOwnProperty(key)) {
			result[ret[key]] = key;
		}
	}
	return result;
}
function decode(str, ret) {
	var i = 0;
	var result = '';
	var data = '';
	var map = reverseRet(ret);
	while(str) {
		result += str[i++];
		if (result in map) {
			data += map[result];
			str = str.replace(new RegExp("^"+result),'');
			result = '';
			i = 0;
		}
	}
	console.log(data)
}

function traversal(tree, code, ret) {
	if (tree.left !== null) {
		traversal(tree.left, code + '0', ret);
	} else {
		ret[tree.data.key] = code;
	}
	if (tree.right !== null) {
		traversal(tree.right,code + '1', ret);
	} else {
		ret[tree.data.key] = code;
	}

}
var ret = {};
var str = 'ew qew qd ef 24 gf ewr getElementsByTagName';
traversal(makeTree(sort(cal(str)))[0],'', ret)
decode(encode(str, ret), ret)
btoa(encode(str,ret))
