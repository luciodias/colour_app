__version__ = "1.27.0"


def cast(type, val):
    return val


def get_origin(type):
    return None


def get_args(type):
    return ()


def no_type_check(func):
    return func


def overload(func):
    return None


def override(func):
    return func


class _AnyCall:
    def __init__(*args, **kwargs):
        pass

    def __call__(*args, **kwargs):
        pass

    def __getitem__(self, arg):
        return _anyCall


_anyCall = _AnyCall()


class _SubscriptableType:
    def __getitem__(self, arg):
        return _anyCall


_Subscriptable = _SubscriptableType()


class Any:
    pass


Any = Any  # type: ignore[assignment]


def TypeVar(name, *types, bound=None, covariance=False, contravariant=False, infer_variance=False):
    return None


def NewType(name, type):
    return type


class BinaryIO:
    pass


class ClassVar:
    pass


class Final:
    pass


class Hashable:
    pass


class IO:
    pass


class NoReturn:
    pass


class Sized:
    pass


class SupportsInt:
    pass


class SupportsFloat:
    pass


class SupportsComplex:
    pass


class SupportsBytes:
    pass


class SupportsIndex:
    pass


class SupportsAbs:
    pass


class SupportsRound:
    pass


class TextIO:
    pass


class Protocol:
    pass


TYPE_CHECKING = False

AbstractSet = dict
AsyncContextManager = dict
AsyncGenerator = dict
AsyncIterable = dict
AsyncIterator = dict
Awaitable = dict
Callable = dict
ChainMap = dict
Collection = dict
Container = dict
ContextManager = dict
Coroutine = dict
Counter = dict
DefaultDict = dict
Deque = dict
Dict = dict
FrozenSet = dict
Generator = dict
Generic = dict
Iterable = dict
Iterator = dict
List = dict
Literal = dict
Mapping = dict
MutableMapping = dict
MutableSequence = dict
MutableSet = dict
NamedTuple = dict
Optional = dict
OrderedDict = dict
Self = dict
Sequence = dict
Set = dict
Tuple = dict
Type = dict
Union = dict