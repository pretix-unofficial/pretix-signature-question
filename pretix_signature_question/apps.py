from django.utils.translation import gettext_lazy
from . import __version__

try:
    from pretix.base.plugins import PluginConfig
except ImportError:
    raise RuntimeError("Please use pretix 2.7 or above to run this plugin!")


class PluginApp(PluginConfig):
    default = True
    name = "pretix_signature_question"
    verbose_name = "Signature Question"

    class PretixPluginMeta:
        name = gettext_lazy("Signature Question")
        author = "pretix"
        description = gettext_lazy("Allows to draw a signature")
        visible = True
        version = __version__
        category = "CUSTOMIZATION"
        compatibility = "pretix>=2.7.0"

    def ready(self):
        from . import signals  # NOQA


