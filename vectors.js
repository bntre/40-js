// Linear algebra helpers

// Vec* and Mat* return the subject, vec* and mat* do not.

function VecNew(n) {
    return new Array(n).fill(0);
}

function VecCopy(v) {
    return [...v];
}

function VecAt(v, i) {
    if (i < 0) i += v.length; // allow negative indexes like Python
    return v[i];
}

function vecAdd(v0, v1) {
    for (let i = 0; i < v0.length; ++i) { v0[i] += v1[i]; }
}

function vecSub(v0, v1) {
    for (let i = 0; i < v0.length; ++i) { v0[i] -= v1[i]; }
}

function vecMult(v, k) {
    for (let i = 0; i < v.length; ++i) { v[i] *= k; }
}
function VecDot(v0, v1) {
    var s = 0;
    for (let i = 0; i < v0.length; ++i) {
        s += v0[i] * v1[i];
    }
    return s;
}
function VecLen(v0) {
    return Math.sqrt(VecDot(v0, v0));
}

/*
We use column vectors.
    https://en.wikipedia.org/wiki/Row_and_column_vectors
    https://en.wikipedia.org/wiki/Transformation_matrix
    https://open.gl/transformations
[M3] * [M2] * [M1] * [V1] => [V2]
*/

function MatNew() {
    //!!! do we need other sizes?
    return [
        [1,0,0,0],
        [0,1,0,0],
        [0,0,1,0],
        [0,0,0,1]
    ];
}

function MatMultVec(m, v) {
    let n = v.length;
    var r = VecNew(n);
    for (let i = 0; i < n; ++i)
     for (let j = 0; j < n; ++j)
        r[i] += m[i][j] * v[j];
    return r;
}

function MatMultVecHom(m, v) {
    // https://en.wikipedia.org/wiki/Homogeneous_coordinates
    let r = MatMultVec(m, [...v, 1]);
    let w = r.pop();
    if (w != 0 && w != 1) {
        vecMult(r, 1 / w);
    }
    return r;
}

function MatMult(m2, m1) {
    var r = MatNew();
    for (var i=0; i<4; ++i)
     for (var j=0; j<4; ++j) {
        r[i][j] = 0;
        for (var k=0; k<4; ++k)
           r[i][j] += m2[i][k] * m1[k][j];
    }
    return r;
}

function MatRotation(i, j, a) {
    let c = Math.cos(a);
    let s = Math.sin(a);
    return MatRotation2(i, j, c, s);
}

function MatRotation2(i, j, c, s) {
    var m = MatNew();
    m[i][i] =  c;
    m[i][j] = -s;
    m[j][i] =  s;
    m[j][j] =  c;
    return m;
}

