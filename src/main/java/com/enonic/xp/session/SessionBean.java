package com.enonic.xp.session;

import java.util.*;
import java.util.function.Supplier;

import com.enonic.xp.portal.PortalRequest;
import com.enonic.xp.script.bean.BeanContext;
import com.enonic.xp.script.bean.ScriptBean;

public class SessionBean implements ScriptBean {
  private Supplier<PortalRequest> portalRequestSupplier;

  public String getId() {
    return portalRequestSupplier
        .get()
        .getRawRequest()
        .getSession(true)
        .getId();
  }

  public List<String> getAttributeNames() {
    Enumeration<String> attributeNames = portalRequestSupplier
        .get()
        .getRawRequest()
        .getSession(true)
        .getAttributeNames();

    return Collections.list(attributeNames);
  }

  public long getCreationTime() {
    return portalRequestSupplier
        .get()
        .getRawRequest()
        .getSession(true)
        .getCreationTime();
  }

  public void setAttribute(final String key, final Object value) {
    portalRequestSupplier
        .get()
        .getRawRequest()
        .getSession(true)
        .setAttribute(key, value);
  }

  public Object getAttribute(final String key) {
    return portalRequestSupplier
        .get()
        .getRawRequest()
        .getSession(true)
        .getAttribute(key);
  }

  public void removeAttribute(final String key) {
    portalRequestSupplier
        .get()
        .getRawRequest()
        .getSession(true)
        .removeAttribute(key);
  }

  @Override
  public void initialize(final BeanContext context) {
    this.portalRequestSupplier = context.getBinding(PortalRequest.class);
  }
}